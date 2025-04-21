"use client";

import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import useAuth from "@/hooks/useAuth"; // Custom authentication hook

const NonDashboardNavbar = () => {
  const { user, isLoaded } = useAuth(); // Replace Clerk's useUser with custom useAuth
  const userRole = user?.userType as "student" | "teacher";

  if (!isLoaded) {
    return null; // Prevent rendering until user data is loaded
  }

  return (
    <nav className="nondashboard-navbar">
      <div className="nondashboard-navbar__container">
        <div className="nondashboard-navbar__search">
          <Link href="/" className="nondashboard-navbar__brand" scroll={false}>
            EDROH
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link
                href="/search"
                className="nondashboard-navbar__search-input"
                scroll={false}
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen
                className="nondashboard-navbar__search-icon"
                size={18}
              />
            </div>
          </div>
        </div>
        <div className="nondashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>

          {user ? (
            <div className="nondashboard-navbar__user">
              <Link
                href={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
                className="nondashboard-navbar__user-link"
                scroll={false}
              >
                {user.fullName || "User"}
              </Link>
            </div>
          ) : (
            <div className="nondashboard-navbar__auth">
              <Link
                href="/signin"
                className="nondashboard-navbar__auth-button--login"
                scroll={false}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="nondashboard-navbar__auth-button--signup"
                scroll={false}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;