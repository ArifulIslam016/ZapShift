import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Outlet } from 'react-router';
import AuthImg from '../../assets/authImage.png'
const AuthenticationLayout = () => {
    return (
        <div className='max-w-[1440px] mx-auto '>
            <div className=''><Logo></Logo></div>
            <div className='flex justify-center items-center'>
                <div className='flex-1  mx-auto'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 flex justify-center items-center h-screen bg-[#FAFDF0] '>
                    <img src={AuthImg} alt="Authentication image logo" />
                </div>
            </div>
            
        </div>
    );
};

export default AuthenticationLayout;