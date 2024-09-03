"use client"

import { motion } from "framer-motion"

export default function AnimatedAbout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-12 p-4"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>
      <p className="mb-4">
        Hello! I'm Ramiro Lopez Cento, a passionate developer and blogger. I
        love exploring new technologies and sharing my knowledge through my blog
        posts.
      </p>
      <p className="mb-4">
        My expertise includes web development, with a focus on Next.js and
        React. I'm always eager to learn and grow in this ever-evolving field of
        technology.
      </p>
      <p>
        Feel free to explore my blog posts and connect with me on LinkedIn or
        GitHub!
      </p>
    </motion.div>
  )
}
