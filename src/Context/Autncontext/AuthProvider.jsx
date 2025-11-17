import React from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const AuthProvider = ({ children }) => {
  const CreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
const hd="bangladesh"
  const AuthInfo = {
    CreateUser,
    signInUser,
    hd

  };
  return <Authcontext value={AuthInfo}>{children}</Authcontext>;
};

export default AuthProvider;
