"use client";

import Header from "@/components/Header";
import React from "react";
import useAuth from "@/hooks/useAuth"; // Custom authentication hook

const UserProfilePage = () => {
  const { user, isLoaded } = useAuth(); // Replace Clerk's useUser with custom useAuth

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <>
      <Header title="Profile" subtitle="View your profile" />
      <div className="user-profile">
        <div className="profile-container bg-customgreys-darkGrey p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white">User Profile</h2>
          <p className="text-white mt-4">
            <strong>Name:</strong> {user.fullName || "N/A"}
          </p>
          <p className="text-white mt-2">
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p className="text-white mt-2">
            <strong>Role:</strong> {user.userType || "Student"}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;