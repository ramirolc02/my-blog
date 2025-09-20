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
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        priority={prty}
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