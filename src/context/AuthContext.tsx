import { createContext, useState, useEffect } from "react";
import { account, ID } from "../appwrite/appwriteConfig";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<null | object>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkLoggedInUser = async () => {
      setIsLoading(true);
      try {
        const session = await account.get();
        setIsLoading(false);
        setUser(session);
      } catch (error) {
        setIsLoading(false);
        setUser(null);
        console.log(" getCurrentUser :: error", error);
      }

      return null;
    };

    checkLoggedInUser();
  }, []);

  // const loginWithGoogle = async () => {
  //   try {
  //     // Use Appwrite to create a new session with Google access token
  //     account.createOAuth2Session(
  //       "google",
  //       "http://localhost:5173/dashboard",
  //       "http://localhost:5173/signin"
  //     );
  //   } catch (error) {
  //     console.error("Error logging in with Google:", error);
  //   }
  // };

  // const createVerification = async () => {
  //   try {
  //     await account.createVerification(
  //       `${import.meta.env.VITE_API_END_POINT}/verify`
  //     );
  //   } catch (error) {
  //     console.log("Verify Error", error);
  //     // toast.error("Verification error occurred.");
  //   }
  // };

  // const updateVerification = async (userId: string, secret: string) => {
  //   try {
  //     await account
  //       .updateVerification(userId, secret)
  //       .then((_res) => console.log("Your account has been verified."));
  //   } catch (error) {
  //     console.log("Verify Update Error", error);
  //     // toast.error("Verification error occurred.")
  //   }
  // };

  // const getProfile = async () => {
  //   try {
  //     const profile = await account.get();
  //     return profile.prefs;
  //   } catch (error) {
  //     console.error("Get Profile Error ", error);
  //   }
  // };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await account.createEmailSession(email, password);

      if (res?.userId) {
        setIsLoading(false);
        window.location.href = import.meta.env.VITE_REDIRECT_URL_LOCAL; // Replace with your target URL

        // throw redirect({
        //   to: "/dashboard",

        // });
      }

      // const profile = await getProfile();
      // if(profile?.state)

      // if (!profile?.emailVerification) {
      //   console.log("Email not verified yet. Verify first.");
      //   createVerification();
      // }
      return { login: true };
    } catch (error) {
      setIsLoading(false);
      console.error("Login Error", error);
    }
  };

  const logout = async () => {
    try {
      // Use Appwrite to logout the current user
      await account.deleteSession("current");

      // Update user state to null
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const createAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      setIsLoading(true);
      const res = await account.create(ID.unique(), email, password, name);
      console.log("create", res);
      if (res?.status) {
        login(email, password);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, createAccount, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
