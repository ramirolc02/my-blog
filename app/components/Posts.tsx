import { getPostsMeta } from "@/lib/posts"
import AnimatedWrapper from "./AnimatedWrapper"
import ListItem from "./ListItem"

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>
  }

  return (
    <AnimatedWrapper className="mt-6 mx-auto">
      <ul className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id}>
            <AnimatedWrapper>
              <ListItem post={post} />
            </AnimatedWrapper>
          </li>
        ))}
      </ul>
    </AnimatedWrapper>
  )
}
