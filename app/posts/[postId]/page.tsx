import getFormattedDate from "@/lib/getFormattedDate"
import { getPostByName, getPostsMeta } from "@/lib/posts"
import "highlight.js/styles/github-dark.css"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 86400

type Props = {
  params: {
    postId: string
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMeta() //deduped!

  if (!posts) return []

  return posts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({ params: { postId } }: Props) {
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

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) notFound()

  const { meta, content } = post

  const pubDate = getFormattedDate(meta.date)

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl mt-4 mb-0 pt-6">{meta.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article className=" prose lg:prose-l dark:prose-invert">
        {content}
      </article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  )
}
