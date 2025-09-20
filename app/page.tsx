import AnimatedWrapper from "./components/AnimatedWrapper"
import Posts from "./components/Posts"

export const revalidate = 86400

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl overflow-hidden">
      <AnimatedWrapper>
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Ramiro Lopez Cento&apos;s Website
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            23 year old guy from Argentina living in Spain. Learning stuff including tech, sports, health, investing, guitar, and more. Not great at any of them yet, but getting closer everyday.
          </p>
        </header>
      </AnimatedWrapper>

      <Posts />
    </div>
  )
}
