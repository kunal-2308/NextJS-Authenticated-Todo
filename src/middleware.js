import { NextResponse } from "next/server";
import { getTokenValue } from "./helper/getTokenfromCookie";
// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublic && token) {
    return NextResponse.redirect(new URL(`/list`, request.nextUrl));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/list", "/list/:path"],
};
