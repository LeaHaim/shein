import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserContextWrapper } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextWrapper>
      <App />
    </UserContextWrapper>
  </StrictMode>
);
