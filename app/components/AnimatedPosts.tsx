"use client"

import { motion } from "framer-motion"
import ListItem from "./ListItem"

type Props = {
  posts: Meta[]
}

export default function AnimatedPosts({ posts }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6 mx-auto max-w-2xl"
    >
      <ul className="w-full list-none p-0 grid gap-4 md:grid-cols-2">
        {posts.map((post, index) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ListItem post={post} />
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
}
