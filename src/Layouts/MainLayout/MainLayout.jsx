import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../Pages/Home/Home/Shared/Footer/Footer';
import Navbar from '../../Pages/Home/Home/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-[1440px] mx-auto bg-gray-50'>
            <Navbar></Navbar>
            <div className='grow'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;