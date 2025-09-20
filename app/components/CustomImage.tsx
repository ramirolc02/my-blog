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
                <div className="relative w-full">
                    <Image
                        className="w-full h-auto rounded-t-lg transition-transform duration-300 hover:scale-[1.02]"
                        src={src}
                        alt={alt}
                        width={800}
                        height={600}
                        priority={prty}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
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