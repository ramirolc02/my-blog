import { getTagStatistics } from "@/lib/posts"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AnimatedWrapper from "../components/AnimatedWrapper"

export const revalidate = 86400

export const metadata = {
    title: "Explore by Tags - Ramiro's Blog",
    description: "Browse all topics and categories covered in the blog",
}

export default async function TagsOverview() {
    const tagStats = await getTagStatistics()

    if (!tagStats) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <p className="text-center text-muted-foreground">No tags found.</p>
            </div>
        )
    }

    const { allTags, totalPosts, tagCloud } = tagStats

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <AnimatedWrapper>
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        Explore All Tags
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Discover content across {allTags.length} tags from {totalPosts} posts
                    </p>
                </header>
            </AnimatedWrapper>

            <div className="grid gap-8">
                {/* Tag Cloud Section */}
                <AnimatedWrapper>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Popular Tags</CardTitle>
                            <CardDescription>
                                Most frequently discussed topics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {tagCloud.map((tag) => {
                                    const sizeClass =
                                        tag.frequency === 'high' ? 'text-lg px-4 py-2' :
                                            tag.frequency === 'medium' ? 'text-base px-3 py-1.5' :
                                                'text-sm px-2 py-1'

                                    return (
                                        <Link key={tag.name} href={`/tags/${tag.name}`}>
                                            <Badge
                                                variant="secondary"
                                                className={`${sizeClass} hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer`}
                                            >
                                                {tag.name}
                                                <span className="ml-1 opacity-70">({tag.count})</span>
                                            </Badge>
                                        </Link>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>

                <Separator />

                {/* All Tags Section */}
                <AnimatedWrapper>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">All Tags</CardTitle>
                            <CardDescription>
                                Complete list of all tags used in the blog
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allTags.map((tag) => (
                                    <Link key={tag.name} href={`/tags/${tag.name}`}>
                                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group">
                                            <span className="font-medium group-hover:text-primary transition-colors capitalize">
                                                {tag.name}
                                            </span>
                                            <div className="text-sm text-muted-foreground">
                                                {tag.count} post{tag.count !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>

                {/* Statistics */}
                <AnimatedWrapper>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold">{totalPosts}</div>
                                <div className="text-sm text-muted-foreground">Total Posts</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold">{allTags.length}</div>
                                <div className="text-sm text-muted-foreground">All Tags</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold">{tagCloud.length}</div>
                                <div className="text-sm text-muted-foreground">Popular Tags</div>
                            </CardContent>
                        </Card>
                    </div>
                </AnimatedWrapper>
            </div>
        </div>
    )
}
