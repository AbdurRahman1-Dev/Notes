import { createContext, useState, useEffect } from "react";
import { account, client, ID } from "../appwrite/appwriteConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const session = await account.getSession("current");
        setUser(session);
      } catch (error) {
        console.log(" getCurrentUser :: error", error);
      }

      return null;
    };

    checkLoggedInUser();
  }, [account]);

  const loginWithGoogle = async (email, password, name) => {
    try {
      // Use Appwrite to create a new session with Google access token
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173/dashboard",
        "http://localhost:5173/signin"
      );

      // Fetch user data and update state
      const session = await account.getSession("current");
      setUser(session);
      console.log(session);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createSession(email, password);
      setUser(session);
      console.log(session);
    } catch (error) {
      // throw error;
      console.log(error);
    }
  };

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

  // const logout = async () => {
  //   try {
  //     // Use Appwrite to logout the current user
  //     await account.deleteSession("current");

  //     // Update user state to null
  //     setUser(null);
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };

  async function createAccount(email, password, name) {
    console.log("clicked");

    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        console.log(userAccount);
        return login({ email, password });
      } else {
        console.log("not found", userAccount);

        return userAccount;
      }
    } catch (error) {
      // throw error;
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, createAccount, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
