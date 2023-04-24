import React, { useContext } from "react";
import { Context } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(Context);
  const logutHandler = () => {
    logOut()
      .then(() => {})
      .catch(console.error());
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Triluxo job task</a>
        <p className="text-blue-600">
          {user?.email} <b>active</b>
        </p>
      </div>
      <div className="flex-none">
        <Link to={"/"} className="btn btn-ghost">
          Home
        </Link>
        <Link to={"/register"} className="btn btn-ghost">
          Register
        </Link>
        <Link to={"/login"} className="btn btn-ghost">
          Login
        </Link>
        <Link onClick={logutHandler} className="btn btn-ghost">
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
