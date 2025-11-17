import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null)
    const [isLoading,setIsloading]=useState(true)
  const CreateUser = (email, password) => {
    setIsloading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
        setIsloading(true)

    return signInWithEmailAndPassword(auth, email, password);
  };
const googleSocialLogin=()=>{
        setIsloading(true)

   return signInWithPopup(auth,googleProvider)
}
const logOut=()=>{
   return signOut(auth)
}
const UpdateUserProfile=(UpdatedInfo)=>{
  return  updateProfile(auth.currentUser,UpdatedInfo)
}
useEffect(()=>{
    const unsubcribe=onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setIsloading(false)
    })
    return ()=>{
        unsubcribe()
    }
},[])
  const AuthInfo = {
    CreateUser,
    signInUser,
   googleSocialLogin,
   logOut,
   user,
   isLoading,
   UpdateUserProfile

  };
  return <Authcontext value={AuthInfo}>{children}</Authcontext>;
};

export default AuthProvider;
