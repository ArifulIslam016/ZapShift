import axios from 'axios';
import React, { useEffect } from 'react';
import useAuthhooks from './Authhooks';
const secureInstance=axios.create({
    baseURL:'http://localhost:3000'
})
const useSecureInstance = () => {
    const {user}=useAuthhooks()
  useEffect(()=>{
      secureInstance.interceptors.request.use((config)=>{
          config.headers.Authorization= `Bearer ${user.accessToken}`
        return config
    })
  },[user])
    return secureInstance;
};

export default useSecureInstance;