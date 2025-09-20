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
  let path: string = "/";

  if (request.method === "GET") {
    // Manual revalidation with secret token (for your curl commands)
    const secret = request.nextUrl.searchParams.get("secret");
    path = request.nextUrl.searchParams.get("path") || "/";

    if (secret !== process.env.GITHUB_WEBHOOK_SECRET) {
      return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  } else if (request.method === "POST") {
    // GitHub webhook with signature verification
    const body = await request.text()

    if (!(await verifyGitHubSignature(request, body))) {
      return new NextResponse(JSON.stringify({ message: "Invalid Signature" }), {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Optional: Parse the webhook payload to get specific paths
    try {
      const payload = JSON.parse(body)
      // You could revalidate specific paths based on which files changed
      // For now, we'll revalidate the homepage for any push
      path = "/"
    } catch (error) {
      // If payload parsing fails, just revalidate the homepage
      path = "/"
    }
  }

  revalidatePath(path)

  return NextResponse.json({ revalidated: true })
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request)
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request)
}
