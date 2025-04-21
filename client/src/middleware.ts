import { NextRequest, NextResponse } from "next/server";

const isStudentRoute = (path: string): boolean => /^\/user\/(.*)/.test(path);
const isTeacherRoute = (path: string): boolean => /^\/teacher\/(.*)/.test(path);

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redirect to login if no token is found
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Decode the JWT token
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const userRole: "student" | "teacher" = payload?.userType || "student";

    const pathname = req.nextUrl.pathname;

    if (isStudentRoute(pathname)) {
      if (userRole !== "student") {
        const teacherUrl = new URL("/teacher/courses", req.url);
        return NextResponse.redirect(teacherUrl);
      }
    }

    if (isTeacherRoute(pathname)) {
      if (userRole !== "teacher") {
        const studentUrl = new URL("/user/courses", req.url);
        return NextResponse.redirect(studentUrl);
      }
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow the request if authenticated
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};