import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";
import { routeTree } from "./routeTree.gen";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({ routeTree });

function App() {
  // const { user } = useContext(AuthContext);
  return <RouterProvider router={router} />;
}

export default App;
