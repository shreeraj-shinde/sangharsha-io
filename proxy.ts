import { getServerSession } from "next-auth";
import { withAuth , NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const { pathname } = req.nextUrl;
  const session = await getServerSession();

  const publicPaths = ["/login", "/signup", "/api/auth/signin", "/api/auth/signout"];

  // If the user is authenticated and trying to access login or signup page
  if (session && publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not authenticated and trying to access a protected route
  if (!req.nextauth.token && !publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
  }
        
});

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};