import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl hover:text-primary transition-colors">
          RLC
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://www.linkedin.com/in/ramiro-lopez-cento/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/ramirolc02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
