import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
// import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";

// interface AuthProviderProps {
//   children: React.ReactNode;
// }
const PrivateAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const navigate = useNavigate();

  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner color="primary"></Spinner>;
  } else if (!user) {
    // navigate({
    //   to: `/signin`,
    // });
    window.location.href = "/signin";
  }
  return children;
};

export default PrivateAuth;
