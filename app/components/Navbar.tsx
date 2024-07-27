import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white/90 no-underline hover:text-white text-xl font-bold"
        >
          Ramiro Lopez Cento
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            className="text-white/90 hover:text-white text-4xl"
            href="https://www.linkedin.com/in/ramiro-lopez-cento/"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="text-white/90 hover:text-white text-4xl"
            href="https://github.com/ramirolc02"
            aria-label="GitHub"
          >
            <FaGithub />
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
