import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <Link href="/" className="text-white/90 no-underline hover:text-white">
          Ramiro Lopez Cento
        </Link>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl space-x-2">
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
    </nav>
  );
}
