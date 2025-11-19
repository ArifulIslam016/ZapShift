import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./Context/Autncontext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const quaryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={quaryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
