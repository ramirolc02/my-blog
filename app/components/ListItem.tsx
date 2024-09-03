import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"

type Props = {
  post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date } = post
  const formattedDate = getFormattedDate(date)

  return (
    <Link href={`/posts/${id}`} className="block no-underline">
      <article className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 no-underline">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 no-underline">
            {formattedDate}
          </p>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center hover-bounce">
            Read more
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  )
}
