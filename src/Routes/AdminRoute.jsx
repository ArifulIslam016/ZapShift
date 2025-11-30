import React from 'react';
import useUserRoleHook from '../hooks/UserRoleHook';
import Forbiden from '../Components/Logo/Forbiden/Forbiden';

const AdminRoute = ({children}) => {
    const {role,isLoading}=useUserRoleHook()
    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(role!=="admin"){
        return <Forbiden></Forbiden>
    }
    return children
    ;
};

export default AdminRoute;