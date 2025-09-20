import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

type Props = {
  post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date, tags } = post
  const formattedDate = getFormattedDate(date)

  return (
    <article className="group h-full">
      <Link href={`/posts/${id}`} className="block h-full">
        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/20 bg-card text-card-foreground">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            {/* Tags Section */}
            <div className="flex flex-wrap gap-2">
              {tags?.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground"
                >
                  {tag}
                </Badge>
              ))}
              {tags?.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 border-border/50 text-muted-foreground"
                >
                  +{tags.length - 2} more
                </Badge>
              )}
            </div>

            {/* Read More Section */}
            <div className="flex items-center justify-end pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}
