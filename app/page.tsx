import AnimatedWrapper from "./components/AnimatedWrapper"
import Posts from "./components/Posts"

export const revalidate = 86400

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Ramiro Lopez Cento&apos;s Website
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to my personal blog where I share insights about technology, development, and life experiences.
          </p>
        </div>
      </AnimatedWrapper>
      <Posts />
    </div>
  )
}
