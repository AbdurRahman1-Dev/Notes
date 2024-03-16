import { createContext, useState, useEffect } from "react";
import { account, client } from "../appwrite/appwriteConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        // Check if there's a logged-in user session
        const session = await account.getSession("current");

        setUser(session);
        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);
      } catch (error) {
        console.error("Error checking logged in user:", error);
      }
    };

    checkLoggedInUser();
  }, [account]);

  const loginWithGoogle = async (userID, email, password) => {
    try {
      // Create account with Appwrite
      const result = await account.create(userID, email, password);
      console.log(result);

      // After successful signup, you might want to redirect the user
    } catch (error) {
      console.error("Signup Error:", error);
    }

    // try {
    //   // Use Appwrite to create a new session with Google access token
    //   const res = await account.createOAuth2Session(
    //     "google",
    //     "http://localhost:5173/dashboard",
    //     "http://localhost:5173/signin"
    //   );

    //   // // Fetch user data and update state
    //   // const userData = await account.get();
    //   // setUser(userData);
    //   // console.log(userData);
    // } catch (error) {
    //   console.error("Error logging in with Google:", error);
    // }
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

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
