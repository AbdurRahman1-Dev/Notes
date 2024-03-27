import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";

const PrivateAuth = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner color="primary"></Spinner>;
  } else if (user) {
    return children;
  }

  return navigate({
    to: `/signin`,
  });
};

export default PrivateAuth;
