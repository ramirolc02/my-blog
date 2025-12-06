import AnimatedWrapper from "./components/AnimatedWrapper"
import Posts from "./components/Posts"

export const revalidate = 86400

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl overflow-hidden">
      <AnimatedWrapper>
        <header className="text-center mb-16">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Ramiro Lopez Cento
          </h3>
          <div className="flex flex-col items-center">
            <span className="text-xl text-muted-foreground text-center max-w-3xl leading-relaxed">
              🇦🇷 🇪🇸
            </span>
            <span className="text-xl text-muted-foreground text-center max-w-3xl leading-relaxed">
              Curious about tech, sports, health, investing and guitar.
            </span>
            <span className="text-xl text-muted-foreground text-center max-w-3xl leading-relaxed">
              Computer Engineering & AI Master’s Graduate (
              <a
                href="https://www.upm.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                UPM
              </a>
              ).
            </span>
            <span className="text-xl text-muted-foreground text-center max-w-3xl leading-relaxed">

              <a
                href="/compound-interest"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Compound interest enthusiast.
              </a>
            </span>

          </div>
        </header>
      </AnimatedWrapper>



      <Posts />
    </div>
  )
}
