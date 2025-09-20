import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

type Props = {
  post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date, tags } = post
  const formattedDate = getFormattedDate(date)

  return (
    <Link href={`/posts/${id}`} className="block">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tags?.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags?.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
              <span className="mr-1">Read more</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
