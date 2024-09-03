import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="md:px-6 prose prose-xl mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex space-x-2 text-white text-3xl sm:text-4xl">
            <Link
              className="text-white/90 hover:text-white"
              href="https://www.linkedin.com/in/ramiro-lopez-cento/"
            >
              <FaLinkedin />
            </Link>
            <Link
              className="text-white/90 hover:text-white"
              href="https://github.com/ramirolc02"
            >
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
