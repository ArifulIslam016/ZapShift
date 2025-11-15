import React from 'react';
import logoImg from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logoImg} alt="" />
            <h1 className='text-3xl font-bold -ms-3 text-primary'>ZapShift</h1>
        </div>
    );
};

export default Logo;