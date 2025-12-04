import React from 'react';
import useUserRoleHook from '../../../hooks/UserRoleHook';
import DashboardAdminHomepage from './DashboardAdminHomepage';
import DashboardRiderHomepage from './DashboardRiderHomepage';
import DashboardUserHomepage from './DashboardUserHomepage';

const DashboardHomePage = () => {
    const {role,isLoading}=useUserRoleHook()
    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(role==='admin'){
        return <DashboardAdminHomepage></DashboardAdminHomepage>
    }else if(role==='Rider'){
        return <DashboardRiderHomepage></DashboardRiderHomepage>

    }else{
        return <DashboardUserHomepage></DashboardUserHomepage>
    }
};

export default DashboardHomePage;