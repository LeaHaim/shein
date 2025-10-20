import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="max-w-[1450px] mx-auto mt-5 px-5">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
