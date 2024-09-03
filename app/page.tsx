import AnimatedWrapper from "./components/AnimatedWrapper"
import Posts from "./components/Posts"

export const revalidate = 86400

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-[url('/subtle-pattern.png')] bg-repeat">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedWrapper>
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Ramiro Lopez Cento&apos;s Website
          </h1>
        </AnimatedWrapper>
        <Posts />
      </div>
    </div>
  )
}
