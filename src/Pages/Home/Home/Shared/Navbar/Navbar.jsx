import React from "react";
import Logo from "../../../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuthhooks from "../../../../../hooks/Authhooks";

const Navbar = () => {
  const { logOut, user } = useAuthhooks();
  const links = (
    <>
      <li>
        <NavLink to={""}>test</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      {user?<>
      
      <li><NavLink to={"/dashboard/my-percels"}>My Parcels</NavLink></li>
      </>:''}
    </>
  );
  const handleLogout = () => {
    logOut().then().catch();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <Link className="bg-primary btn " onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link className="bg-primary btn " to="/login">
            Login
          </Link>
        )}
        <Link to={"/rider"} className="btn bg-primary text-title">
          Be a Rider
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
