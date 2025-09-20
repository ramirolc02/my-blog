import { getPostsMeta } from "@/lib/posts"
import AnimatedWrapper from "./AnimatedWrapper"
import ListItem from "./ListItem"

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">Sorry, no posts available.</p>
      </div>
    )
  }

  return (
    <section className="w-full">
      <AnimatedWrapper>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((post) => (
            <AnimatedWrapper key={post.id}>
              <ListItem post={post} />
            </AnimatedWrapper>
          ))}
        </div>
      </AnimatedWrapper>
    </section>
  )
}
