"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if the user is on the checkout page and get the course ID if available
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id");

  // Construct the sign-up URL based on the current page
  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : "/signup";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sign-in process
    const fakeToken = btoa(
      JSON.stringify({
        id: "123",
        email,
        userType: "student", // Replace with dynamic logic if needed
      })
    );
    localStorage.setItem("token", fakeToken);

    // Redirect based on the user type or checkout page
    if (isCheckoutPage) {
      router.push(`/checkout?step=2&id=${courseId}&showSignUp=true`);
    } else {
      const userType: "student" | "teacher" = "student"; // Replace with dynamic logic if needed
      if (userType === "student") {
        router.push("/teacher/courses");
      } else {
        router.push("/user/courses");
      }
    }
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSignIn} className="sign-in__form">
        <h1 className="sign-in__title">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-in__input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-in__input"
          required
        />
        <button type="submit" className="sign-in__button">
          Sign In
        </button>
        <p className="sign-in__footer">
          Don’t have an account?{" "}
          <a href={signUpUrl} className="sign-in__link">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInComponent;