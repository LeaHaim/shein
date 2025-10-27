import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { USER_ROLE } from "./types/user.types";
import { PageType } from "./types/pages.types";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <div className="max-w-[1450px] mx-auto mt-5 px-5">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
                redirectTo="/"
                pageType={PageType.PUBLIC}
              >
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
                redirectTo="/"
                pageType={PageType.AUTH}
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
                redirectTo="/"
                pageType={PageType.AUTH}
              >
                <RegisterPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.USER]}
                pageType={PageType.PROTECTED}
                redirectTo="/"
              >
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.USER]}
                pageType={PageType.PROTECTED}
                redirectTo="/"
              >
                <FavoritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLE.ADMIN]}
                pageType={PageType.PROTECTED}
                redirectTo="/"
              >
                <AdminPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
