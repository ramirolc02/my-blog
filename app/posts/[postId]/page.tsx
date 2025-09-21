import getFormattedDate from "@/lib/getFormattedDate"
import { getPostByName, getPostsMeta } from "@/lib/posts"
import "highlight.js/styles/github-dark.css"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Removed conflicting revalidate setting to allow manual revalidation

type Props = {
  params: Promise<{
    postId: string
  }>
}

export async function generateStaticParams() {
  const posts = await getPostsMeta() //deduped!

  if (!posts) return []

  return posts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { postId } = await params
  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.meta.title,
  }
}

export default async function Post({ params }: Props) {
  const { postId } = await params
  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) notFound()

  const { meta, content } = post

  const pubDate = getFormattedDate(meta.date)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to home button */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </Button>
      </div>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {meta.title}
        </h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={meta.date}>{pubDate}</time>
          </div>
        </div>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {meta.tags.map((tag, i) => (
              <Link key={i} href={`/tags/${tag}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        <Separator className="mt-8" />
      </header>

      {/* Article content */}
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-p:leading-relaxed prose-pre:border prose-pre:bg-muted prose-img:rounded-lg prose-img:shadow-lg">
        {content}
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              More articles
            </Link>
          </Button>

          <div className="text-sm text-muted-foreground">
            Published on {pubDate}
          </div>
        </div>
      </footer>
    </div>
  )
}
