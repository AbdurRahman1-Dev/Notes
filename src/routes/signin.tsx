import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/signin")({
  component: () => <Signin />,
});

const Signin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    createAccount,
    logout,
    login,
    isLoading: loading,
  } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    createAccount(email, password, name);
  }

  async function handleLogin(e) {
    e.preventDefault();
    login(email, password, name);
  }

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div className="flex items-center  flex-col">
        <Tabs aria-label="Options" color="primary" variant="bordered">
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <UserPlus />
                <span>SignUp</span>
              </div>
            }
          >
            <div className="space-y-4 bg-secondarybg p-7 rounded-md shadow-md">
              <div className="space-y-1">
                <h2 className="text-4xl font-bold">Welcome to Notes</h2>
                <p className="font-semibold text-base">
                  Create Your Account First
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <Input
                  onChange={(e) => setName(e.target.value)}
                  type="text "
                  label="name"
                  name="name"
                />{" "}
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  name="email"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <Eye /> : <EyeOff />}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
                <Button color="primary" size="lg" className="w-full">
                  {" "}
                  <input
                    className="w-full h-full"
                    type="submit"
                    value={"create Account"}
                  />
                </Button>
              </form>
            </div>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <LogIn />
                <span>SignIn</span>
              </div>
            }
          >
            <div className="space-y-4 bg-secondarybg p-7 rounded-md shadow-md">
              <div className="space-y-1">
                <h2 className="text-4xl font-bold">Welcome to Notes</h2>
                <p className="font-semibold text-base">Login to Your Account</p>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  name="email"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <Eye /> : <EyeOff />}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
                {loading ? (
                  <Button
                    isLoading
                    color="primary"
                    size="lg"
                    className="w-full"
                  >
                    {" "}
                    <input
                      className="w-full h-full"
                      type="submit"
                      value={"Login"}
                    />
                  </Button>
                ) : (
                  <Button color="primary" size="lg" className="w-full">
                    {" "}
                    <input
                      className="w-full h-full"
                      type="submit"
                      value={"Login"}
                    />
                  </Button>
                )}
              </form>
              <button onClick={logout}>out</button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
