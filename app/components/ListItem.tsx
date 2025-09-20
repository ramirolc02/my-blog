import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

type Props = {
  post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date, tags } = post
  const formattedDate = getFormattedDate(date)

  return (
    <article className="group">
      <Link href={`/posts/${id}`} className="block">
        <Card className="transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 border hover:border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="space-y-3">
              <CardTitle className="text-xl font-semibold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {title}
              </CardTitle>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={date}>{formattedDate}</time>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 pb-6">
            {/* Tags Section */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags?.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-secondary/60 text-secondary-foreground font-medium"
                >
                  {tag}
                </Badge>
              ))}
              {tags?.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 text-muted-foreground border-muted-foreground/30"
                >
                  +{tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Read More Section */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-1.5 text-sm font-medium text-primary/80 group-hover:text-primary transition-all duration-200">
                <span>Read more</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}
