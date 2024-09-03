import AnimatedWrapper from "./components/AnimatedWrapper"
import Posts from "./components/Posts"

export const revalidate = 86400

export default function Home() {
  return (
    <div className="pt-8 sm:pt-12">
      <AnimatedWrapper>
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Ramiro Lopez Cento&apos;s Website
        </h1>
      </AnimatedWrapper>
      <div className="prose prose-xl prose-slate dark:prose-invert max-w-none">
        <Posts />
      </div>
    </div>
  )
}
