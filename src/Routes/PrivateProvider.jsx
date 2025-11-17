import React from "react";
import useAuthhooks from "../hooks/Authhooks";
import { Navigate, useLocation } from "react-router";

const PrivateProvider = ({ children }) => {
  const location = useLocation();

  const { user, isLoading } = useAuthhooks();
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateProvider;
