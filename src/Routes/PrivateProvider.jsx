import React from 'react';
import useAuthhooks from '../hooks/Authhooks';
import { Navigate } from 'react-router';

const PrivateProvider = ({children}) => {
    const {user,isLoading,}=useAuthhooks()
    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>

    }
    if(!user){
        <Navigate to={'/login'}></Navigate>
    }
    return children;
};

export default PrivateProvider;