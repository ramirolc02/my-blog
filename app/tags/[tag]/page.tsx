import ListItem from "@/app/components/ListItem"
import AnimatedWrapper from "@/app/components/AnimatedWrapper"
import { getPostsByTag, getPostsMeta, getRelatedTags, getTagStatistics } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Tag, Users, BookOpen, TrendingUp } from "lucide-react"

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
    const posts = await getPostsByTag(tag)

    if (!posts || posts.length === 0) {
        return {
            title: "Tag Not Found",
        }
    }

    const postCount = posts.length
    const postWord = postCount === 1 ? "post" : "posts"

    return {
        title: `${tag} - ${postCount} ${postWord} | Ramiro's Blog`,
        description: `Explore ${postCount} ${postWord} about ${tag}. Discover related topics and in-depth content.`,
    }
}

export default async function TagPostList({ params }: Props) {
    const { tag } = await params
    const tagPosts = await getPostsByTag(tag)
    const relatedTags = await getRelatedTags(tag)
    const tagStats = await getTagStatistics()

    if (!tagPosts || tagPosts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">No posts found</h1>
                        <p className="text-muted-foreground">
                            Sorry, no posts found for the tag <Badge variant="secondary">#{tag}</Badge>
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button asChild variant="outline">
                            <Link href="/tags">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                All Tags
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const postCount = tagPosts.length
    const postWord = postCount === 1 ? 'post' : 'posts'

    // Find current tag statistics
    const currentTagStats = tagStats?.allTags.find(t => t.name === tag)

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Navigation */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/tags" className="group">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        All Tags
                    </Link>
                </Button>
            </div>

            {/* Enhanced Tag Header */}
            <AnimatedWrapper>
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <Tag className="h-8 w-8 text-primary" />
                        <Badge variant="outline" className="text-xl px-6 py-3 font-semibold">
                            {tag}
                        </Badge>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 capitalize">
                        {tag}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Explore all content tagged with "{tag}".
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">{postCount}</div>
                                <div className="text-sm text-muted-foreground">{postWord}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold capitalize">{currentTagStats?.frequency || 'medium'}</div>
                                <div className="text-sm text-muted-foreground">popularity</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AnimatedWrapper>

            {/* Related Tags */}
            {relatedTags && relatedTags.length > 0 && (
                <AnimatedWrapper>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-xl">Related Topics</CardTitle>
                            <CardDescription>
                                Explore these related topics that often appear together
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {relatedTags.map((relatedTag) => (
                                    <Link key={relatedTag} href={`/tags/${relatedTag}`}>
                                        <Badge
                                            variant="outline"
                                            className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                                        >
                                            {relatedTag}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>
            )}

            <Separator className="mb-8" />

            {/* Posts Grid */}
            <AnimatedWrapper>
                <h2 className="text-2xl font-bold mb-6">All {tag} Posts</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tagPosts.map((post) => (
                        <AnimatedWrapper key={post.id}>
                            <ListItem post={post} />
                        </AnimatedWrapper>
                    ))}
                </div>
            </AnimatedWrapper>

            {/* Navigation Footer */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="outline" asChild>
                    <Link href="/tags">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Explore More Tags
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}