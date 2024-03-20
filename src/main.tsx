import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <App />
          </NextThemesProvider>
        </NextUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
