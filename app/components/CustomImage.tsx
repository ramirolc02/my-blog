import Image from "next/image"
import { Card } from "@/components/ui/card"

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {
    const prty = priority ? true : false

    return (
        <figure className="my-8 not-prose">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 max-w-2xl mx-auto">
                <div className="relative w-full aspect-video">
                    <Image
                        className="rounded-t-lg transition-transform duration-300 hover:scale-[1.02] object-cover"
                        src={src}
                        alt={alt}
                        fill
                        priority={prty}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    />
                </div>
                {alt && (
                    <figcaption className="p-4 text-center text-sm text-muted-foreground">
                        {alt}
                    </figcaption>
                )}
            </Card>
        </figure>
    )
}