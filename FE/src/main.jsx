import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "@/styles/GlobalStyle.js";
import AppRouter from "./router/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <AppRouter />
  </StrictMode>
);
