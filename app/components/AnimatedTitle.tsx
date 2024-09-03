"use client"

import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function AnimatedTitle({ children }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 mb-12 text-3xl text-center dark:text-white font-bold break-words px-2"
    >
      {children}
    </motion.h1>
  )
}
