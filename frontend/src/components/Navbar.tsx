import { useUserContext } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings, MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import { USER_ROLE } from "@/types/user.types";
export default function Navbar() {
  const { data, logout } = useUserContext();
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">SHEIN</h1>
        {!data.user ? (
          <div className="flex items-center gap-2 font-semibold">
            <Link to={"/login"} className=" hover:underline">
              Login
            </Link>
            <Link to={"/register"} className=" hover:underline">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6 font-semibold">
            {data.user.role == USER_ROLE.USER ? (
              <div className="flex items-center gap-2 font-semibold">
                <Link to={"/favorite"}>
                  <MdOutlineFavoriteBorder size={25} />
                </Link>
                <Link to={"/cart"}>
                  <BsCart size={25} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-semibold">
                <Link to={"/admin"}>
                  <MdAdminPanelSettings size={25} />
                </Link>
              </div>
            )}
            <button className=" hover:underline" onClick={logout}>
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
