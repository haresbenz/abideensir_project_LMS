import { useState, useEffect } from "react";

// Define the structure for the user object
interface User {
  id: string | null;
  fullName?: string | null;
  email?: string | null;
  userType?: "student" | "teacher" | null;
  exp?: number | null; // Token expiration time in seconds since epoch
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate user retrieval - replace with actual logic if decoding tokens
      const defaultUser: User = {
        id: "12345", // Replace with actual user ID logic
        fullName: "John Doe",
        email: "john.doe@example.com",
        userType: "teacher",
        exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      };
      setUser(defaultUser);
    } else {
      setUser(null); // No token found, user is null
    }
    setIsLoaded(true);
  }, []);

  return { user, isLoaded };
};

export default useAuth;