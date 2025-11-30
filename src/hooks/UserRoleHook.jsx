import React from 'react';
import useSecureInstance from './SecureInstance';
import { useQuery } from '@tanstack/react-query';
import useAuthhooks from './Authhooks';

const useUserRoleHook = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const{data:role='user',isLoading}=useQuery({
        queryKey:['user-role'],
        queryFn:async()=>{
            const res=await Instance.get(`/users/${user.email}/rolse`)
            return(res?.data.role||"user")
        }
    })
    return {role,isLoading};
};

export default useUserRoleHook;