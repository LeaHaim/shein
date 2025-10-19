import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">SHEIN</h1>
        <div className="flex items-center gap-2 font-semibold">
          <Link to={"/login"} className=" hover:underline">
            Login
          </Link>
          <Link to={"/register"} className=" hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
