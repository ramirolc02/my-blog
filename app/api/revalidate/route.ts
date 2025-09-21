import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

async function verifyGitHubSignature(request: NextRequest, body: string): Promise<boolean> {
  const signature = request.headers.get("x-hub-signature-256")
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return false
  }

  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex')}`

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

async function handleRevalidation(request: NextRequest) {
  if (request.method === "GET") {
    const secret = request.nextUrl.searchParams.get("secret")
    const path = request.nextUrl.searchParams.get("path") || "/"

    if (secret !== process.env.GITHUB_WEBHOOK_SECRET) {
      return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
        status: 401,
        statusText: "Unauthorized",
        headers: { "Content-Type": "application/json" },
      })
    }

    // Simple: Just revalidate the path
    revalidatePath(path)
    console.log('Manually revalidated path:', path)

    return NextResponse.json({
      revalidated: true,
      path
    })
  } else if (request.method === "POST") {
    const body = await request.text()

    if (!(await verifyGitHubSignature(request, body))) {
      return new NextResponse(JSON.stringify({ message: "Invalid Signature" }), {
        status: 401,
        statusText: "Unauthorized",
        headers: { "Content-Type": "application/json" },
      })
    }

    try {
      const payload = JSON.parse(body)

      // Debug: Log the payload to see what files are included
      console.log('Webhook payload commits:', JSON.stringify(payload.commits?.map((c: any) => ({
        added: c.added,
        modified: c.modified,
        removed: c.removed
      })), null, 2))

      const pathsToRevalidate = new Set<string>()

      // Always revalidate the homepage and tags page
      pathsToRevalidate.add("/")
      pathsToRevalidate.add("/tags")

      // Simple: Revalidate affected post pages
      payload.commits?.forEach((commit: any) => {
        const allAffectedFiles = [...(commit.added || []), ...(commit.modified || []), ...(commit.removed || [])]
        allAffectedFiles.forEach((file: string) => {
          if (file.endsWith(".mdx")) {
            const postId = file.replace(/\.mdx$/, "")
            pathsToRevalidate.add(`/posts/${postId}`)
          }
        })
      })

      // Simple: Just revalidate the paths
      const revalidationPromises = Array.from(pathsToRevalidate).map((path) =>
        revalidatePath(path)
      )

      await Promise.all(revalidationPromises)

      console.log('Revalidated paths:', Array.from(pathsToRevalidate))

      return NextResponse.json({
        revalidated: true,
        revalidatedPaths: Array.from(pathsToRevalidate)
      })
    } catch (error) {
      if (error instanceof Error) {
        return new NextResponse(JSON.stringify({ message: "Error parsing payload", error: error.message }), {
          status: 400,
          statusText: "Bad Request",
          headers: { "Content-Type": "application/json" },
        })
      }
      return new NextResponse(JSON.stringify({ message: "An unknown error occurred" }), {
        status: 500,
        statusText: "Internal Server Error",
        headers: { "Content-Type": "application/json" },
      })
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      statusText: "Method Not Allowed",
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request)
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request)
}
