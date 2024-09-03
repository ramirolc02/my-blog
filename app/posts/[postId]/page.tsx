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
      <h1 className="text-3xl font-extrabold mt-4 mb-0 pt-6">{meta.title}</h1>
      <p className="mt-0 text-sm text-gray-600 dark:text-gray-400">{pubDate}</p>
      <article className="prose prose-l dark:prose-invert mt-8 prose-headings:font-bold prose-p:my-4">
        {content}
      </article>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related:</h2>
        <div className="flex flex-wrap gap-2">{tags}</div>
      </section>
      <p className="mt-8 mb-10">
        <Link
          href="/"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  )
}
