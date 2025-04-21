"use client";

import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const Navbar = ({ isCoursePage }: { isCoursePage: boolean }) => {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return null; // Prevent rendering until the user data is loaded
  }

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar__container">
        <div className="dashboard-navbar__search">
          <div className="md:hidden">
            <SidebarTrigger className="dashboard-navbar__sidebar-trigger" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link
                href="/search"
                className={cn("dashboard-navbar__search-input", {
                  "!bg-customgreys-secondarybg": isCoursePage,
                })}
                scroll={false}
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen className="dashboard-navbar__search-icon" size={18} />
            </div>
          </div>
        </div>

        <div className="dashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>

          {user ? (
            <div className="user-menu">
              <span className="user-menu__name">{user.fullName}</span>
              <Link
                href={
                  user.userType === "teacher"
                    ? "/teacher/profile"
                    : "/user/profile"
                }
                className="user-menu__profile-link"
              >
                Profile
              </Link>
            </div>
          ) : (
            <Link href="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;