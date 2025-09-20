import ListItem from "@/app/components/ListItem"
import AnimatedWrapper from "@/app/components/AnimatedWrapper"
import { getPostsMeta } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Tag } from "lucide-react"

export const revalidate = 86400

type Props = {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if (!posts) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props) {
    const { tag } = await params

    return {
        title: `Posts about ${tag} | Ramiro's Blog`,
        description: `All blog posts tagged with ${tag}`,
    }
}

export default async function TagPostList({ params }: Props) {
    const { tag } = await params
    const posts = await getPostsMeta()

    if (!posts) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Sorry, no posts available.</p>
                </div>
            </div>
        )
    }

    const tagPosts = posts.filter(post => post.tags.includes(tag))

    if (!tagPosts.length) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">No posts found</h1>
                        <p className="text-muted-foreground">
                            Sorry, no posts found for the tag <Badge variant="secondary">#{tag}</Badge>
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="mb-6">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to home
                    </Link>
                </Button>

                <AnimatedWrapper>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Tag className="h-6 w-6 text-muted-foreground" />
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                Posts tagged with
                            </h1>
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                                #{tag}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Found {tagPosts.length} {tagPosts.length === 1 ? 'post' : 'posts'} with this tag
                        </p>
                    </div>
                </AnimatedWrapper>
            </div>

            {/* Posts Grid */}
            <section>
                <AnimatedWrapper>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {tagPosts.map((post) => (
                            <div key={post.id} className="w-full">
                                <AnimatedWrapper>
                                    <ListItem post={post} />
                                </AnimatedWrapper>
                            </div>
                        ))}
                    </div>
                </AnimatedWrapper>
            </section>
        </div>
    )
}