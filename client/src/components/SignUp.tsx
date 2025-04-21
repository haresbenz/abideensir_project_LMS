"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const router = useRouter();
  const searchParams = useSearchParams();

  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id");

  const signInUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=false`
    : "/signin";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sign-up process
    const fakeToken = btoa(
      JSON.stringify({
        id: "123",
        email,
        userType,
      })
    );
    localStorage.setItem("token", fakeToken);

    // Redirect based on the user type or checkout page
    if (isCheckoutPage) {
      router.push(`/checkout?step=2&id=${courseId}&showSignUp=false`);
    } else {
      if (userType === "teacher") {
        router.push("/teacher/courses");
      } else {
        router.push("/user/courses");
      }
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleSignUp} className="sign-up__form">
        <h1 className="sign-up__title">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-up__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-up__input"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="sign-up__select"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" className="sign-up__button">
          Sign Up
        </button>
        <p className="sign-up__footer">
          Already have an account?{" "}
          <a href={signInUrl} className="sign-up__link">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpComponent;