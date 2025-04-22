import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // Replace with your actual JWT secret

interface TokenPayload extends JwtPayload {
  role: string;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get the token from cookies
  const pathname = req.nextUrl.pathname;

  // Allow access to the login page without authentication
  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    console.error("Token is missing");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Validate the token payload structure
    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "role" in decodedToken &&
      typeof (decodedToken as TokenPayload).role === "string"
    ) {
      const payload = decodedToken as TokenPayload;

      // Redirect based on user role
      if (pathname.startsWith("/user") && payload.role !== "student") {
        return NextResponse.redirect(new URL("/teacher/courses", req.url));
      }

      if (pathname.startsWith("/teacher") && payload.role !== "teacher") {
        return NextResponse.redirect(new URL("/user/courses", req.url));
      }
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (err) {
    // Use a type guard to safely handle errors
    if (err instanceof Error) {
      console.error("Error verifying token:", err.message);
    } else {
      console.error("An unknown error occurred during token verification");
    }

    // Redirect to login if token is invalid or missing
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico).*)",
  ],
};