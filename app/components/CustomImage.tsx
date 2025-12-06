import Image from "next/image"

type Props = {
    src: string
    alt: string
    priority?: boolean
    caption?: string
}

// Medium-style inline image:
// - No visible alt by default (only optional caption).
// - Natural aspect ratio with object-contain (good for portrait shots).
// - Constrained height/width so portraits don't explode the layout.
export default function CustomImage({ src, alt, priority = false, caption }: Props) {
    return (
        <figure className="my-8 flex justify-center">
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