import axios from 'axios';
import React, { useEffect } from 'react';
import useAuthhooks from './Authhooks';
import { useNavigate } from 'react-router';
const secureInstance=axios.create({
    baseURL:'https://zap-shift-server-coral-delta.vercel.app'
})
const useSecureInstance =() => {
    const navigate=useNavigate()
    const {user,logOut}=useAuthhooks()
  useEffect(()=>{
    const requestIncerceptor=  secureInstance.interceptors.request.use((config)=>{
          config.headers.Authorization= `Bearer ${user.accessToken}`
        return config
    })
    const responseInterceptor=secureInstance.interceptors.response.use((res)=>{
        return res
    },(err)=>{
        if(err.status===403||err.status===401){
            logOut()
            navigate('/login')
        }
        return Promise.reject(err)
    })
    return ()=>{
        secureInstance.interceptors.request.eject(requestIncerceptor)
        secureInstance.interceptors.response.eject(responseInterceptor)
    }
  },[user,logOut,navigate])
    return secureInstance;
};

export default useSecureInstance;