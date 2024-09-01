"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-slate-200 dark:bg-slate-300 rounded-full p-1 w-14 h-7 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      <div
        className={`rounded-full w-5 h-5 absolute top-1 transition-transform duration-300 flex items-center justify-center ${
          theme === "dark"
            ? "translate-x-7 bg-slate-700"
            : "translate-x-0 bg-white"
        }`}
      >
        {theme === "dark" ? (
          <FaMoon className="text-slate-200 text-xs" />
        ) : (
          <FaSun className="text-yellow-500 text-xs" />
        )}
      </div>
    </button>
  )
}
