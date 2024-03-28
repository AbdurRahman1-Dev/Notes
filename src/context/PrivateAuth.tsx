import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";
import { AuthContextType } from "../@types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}
const PrivateAuth: React.FC<AuthProviderProps> = ({
  children,
}: {
  children: unknown | React.ReactNode;
}) => {
  const navigate = useNavigate();

  const { user, isLoading } = useContext<AuthContextType>(AuthContext);

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
