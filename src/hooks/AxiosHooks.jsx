import axios from 'axios';
import React from 'react';
const asioxInstance=axios.create({
    baseURL:'http://localhost:3000'
})
const useAxiosHooks = () => {
    return asioxInstance
};

export default useAxiosHooks;