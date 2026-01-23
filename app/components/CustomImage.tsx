'use client'

import Image from "next/image"
import { useState } from "react"

type Props = {
    src: string
    alt: string
    priority?: boolean
    caption?: string
}

/**
 * Checks if a URL points to a GIF image.
 * GIFs need unoptimized={true} to preserve animation.
 */
function isGif(src: string): boolean {
    return src.toLowerCase().endsWith('.gif')
}

// Medium-style inline image:
// - No visible alt by default (only optional caption).
// - Natural aspect ratio with object-contain (good for portrait shots).
// - Constrained height/width so portraits don't explode the layout.
// - GIFs are rendered unoptimized to preserve animation.
// - Shows loading skeleton while GIFs load from GitHub.
export default function CustomImage({ src, alt, priority = false, caption }: Props) {
    const isAnimated = isGif(src)
    const [isLoading, setIsLoading] = useState(true)

    // For GIFs, use a native img tag for better mobile compatibility
    // Next.js Image component can have issues with large GIFs on mobile
    if (isAnimated) {
        return (
            <figure className="my-8 flex flex-col items-center">
                <div className="relative">
                    {/* Loading skeleton */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl min-h-[200px] min-w-[300px]">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-sm">Loading GIF...</span>
                            </div>
                        </div>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setIsLoading(false)}
                        className={`h-auto w-auto max-w-full max-h-[75vh] rounded-xl object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                {caption ? (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                        {caption}
                    </figcaption>
                ) : null}
            </figure>
        )
    }

    return (
        <figure className="my-8 flex flex-col items-center">
            <Image
                src={src}
                alt={alt}
                width={1200}
                height={1200}
                sizes="(min-width: 1280px) 900px, (min-width: 768px) 80vw, 100vw"
                className="h-auto w-auto max-w-full max-h-[75vh] rounded-xl object-contain"
                priority={priority}
            />
            {caption ? (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {caption}
                </figcaption>
            ) : null}
        </figure>
    )
}