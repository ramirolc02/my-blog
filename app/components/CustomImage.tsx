import Image from "next/image"

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
export default function CustomImage({ src, alt, priority = false, caption }: Props) {
    const isAnimated = isGif(src)

    // For GIFs, use a native img tag for better mobile compatibility
    // Next.js Image component can have issues with large GIFs on mobile
    if (isAnimated) {
        return (
            <figure className="my-8 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-auto max-w-full max-h-[75vh] rounded-xl object-contain"
                />
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