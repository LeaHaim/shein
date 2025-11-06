import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserContextWrapper } from "./contexts/UserContext.tsx";
import { CartContextWrapper } from "./contexts/CartContext.tsx";
import { FavoriteContextWrapper } from "./contexts/FavoriteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextWrapper>
      <CartContextWrapper>
        <FavoriteContextWrapper>
          <App />
        </FavoriteContextWrapper>
      </CartContextWrapper>
    </UserContextWrapper>
  </StrictMode>
);
