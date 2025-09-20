import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

async function handleRevalidation(request: NextRequest) {
  // Get secret from query params (GET) or request body (POST)
  let secret: string | null = null;
  let path: string = "/";

  if (request.method === "GET") {
    secret = request.nextUrl.searchParams.get("secret");
    path = request.nextUrl.searchParams.get("path") || "/";
  } else if (request.method === "POST") {
    // For webhook requests, secret is in query params
    secret = request.nextUrl.searchParams.get("secret");
    path = request.nextUrl.searchParams.get("path") || "/";
  }

  if (secret !== process.env.MY_SECRET_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
