import CustomImage from "@/app/components/CustomImage"
import Video from "@/app/components/Video"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"

type FileTree = {
  tree: [
    {
      path: string
    }
  ]
}

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/ramirolc02/content/master/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )
  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === "404: Not Found") return undefined

  const { frontmatter, content } = await compileMDX<{
    title: string,
    date: string,
    tags: string[],
    excerpt?: string,
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            }],
        ],
      },
    }
  })


  const id = fileName.replace(/\.mdx$/, "")

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt,
    },
    content,
  }
  return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/ramirolc02/content/git/trees/master?recursive=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  if (!res.ok) return undefined

  const repoFiletree: FileTree = await res.json()

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"))

  const posts: Meta[] = []

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post
      posts.push(meta)
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Get posts by specific tag
 */
export async function getPostsByTag(tag: string): Promise<Meta[] | undefined> {
  const posts = await getPostsMeta();
  if (!posts) return undefined;

  return posts.filter(post => post.tags.includes(tag));
}


/**
 * Get tag statistics for the entire blog
 */
export async function getTagStatistics(): Promise<{
  allTags: TagStatistics[],
  totalPosts: number,
  tagCloud: TagStatistics[]
} | undefined> {
  const posts = await getPostsMeta();
  if (!posts) return undefined;

  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  const allTags: TagStatistics[] = Array.from(tagCounts.entries()).map(([name, count]) => {
    const frequency: 'high' | 'medium' | 'low' =
      count > posts.length * 0.3 ? 'high' :
        count > posts.length * 0.1 ? 'medium' : 'low';

    return {
      name,
      count,
      frequency
    };
  }).sort((a, b) => b.count - a.count);

  return {
    allTags,
    totalPosts: posts.length,
    tagCloud: allTags.slice(0, 20) // Top 20 for cloud display
  };
}

/**
 * Get related tags for a specific tag
 */
export async function getRelatedTags(targetTag: string): Promise<string[] | undefined> {
  const posts = await getPostsByTag(targetTag);
  if (!posts) return undefined;

  const relatedTagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (tag !== targetTag) {
        relatedTagCounts.set(tag, (relatedTagCounts.get(tag) || 0) + 1);
      }
    });
  });

  return Array.from(relatedTagCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);
}

/**
 * Filter posts based on criteria
 */
export async function filterPosts(filters: FilterOptions): Promise<Meta[]> {
  const posts = await getPostsMeta();
  if (!posts) return [];

  return posts.filter(post => {
    // Filter by tags
    if (filters.tags?.length) {
      const hasTags = filters.tags.some(tag =>
        post.tags.includes(tag)
      );
      if (!hasTags) return false;
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(searchLower);
      const matchesExcerpt = post.excerpt?.toLowerCase().includes(searchLower);
      const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(searchLower));

      if (!matchesTitle && !matchesExcerpt && !matchesTags) return false;
    }

    return true;
  });
}
