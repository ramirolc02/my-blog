import { getPostsMeta } from "@/lib/posts"
import AnimatedWrapper from "./AnimatedWrapper"
import ListItem from "./ListItem"

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">Sorry, no posts available.</p>
      </div>
    )
  }

  return (
    <AnimatedWrapper>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <AnimatedWrapper key={post.id}>
            <ListItem post={post} />
          </AnimatedWrapper>
        ))}
      </div>
    </AnimatedWrapper>
  )
}
