import axios from 'axios';
import React from 'react';
const secureInstance=axios.create({
    baseURL:'http://localhost:3000'
})
const useSecureInstance = () => {
    return secureInstance;
};

export default useSecureInstance;