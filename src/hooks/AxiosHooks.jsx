import axios from 'axios';
import React from 'react';
const asioxInstance=axios.create({
    baseURL:'https://zap-shift-server-coral-delta.vercel.app'
})
const useAxiosHooks = () => {
    return asioxInstance
};

export default useAxiosHooks;