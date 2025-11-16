import React from 'react';
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img src={logoImg} alt="" />
            <h1 className='text-3xl font-bold -ms-3 text-primary'>ZapShift</h1>
        </Link>
    );
};

export default Logo;