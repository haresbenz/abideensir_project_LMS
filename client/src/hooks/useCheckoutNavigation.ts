"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import useAuth from "@/hooks/useAuth"; // Custom authentication hook

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, user } = useAuth(); // Replace Clerk's useUser with custom useAuth

  const courseId = searchParams.get("id") ?? "";
  const checkoutStep = parseInt(searchParams.get("step") ?? "1", 10);

  const navigateToStep = useCallback(
    (step: number) => {
      const newStep = Math.min(Math.max(1, step), 3);
      const showSignUp = user ? "true" : "false";

      router.push(
        `/checkout?step=${newStep}&id=${courseId}&showSignUp=${showSignUp}`,
        {
          scroll: false,
        }
      );
    },
    [courseId, user, router]
  );

  useEffect(() => {
    if (isLoaded && !user && checkoutStep > 1) {
      navigateToStep(1);
    }
  }, [isLoaded, user, checkoutStep, navigateToStep]);

  return { checkoutStep, navigateToStep };
};