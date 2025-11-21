import React from 'react';
import { Link } from 'react-router';

const Cancel = () => {
    return (
        <div>
            <h1>Payment Failed</h1>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to='/dashboard/my-percels'>Try Again</Link>
        </div>
    );
};

export default Cancel;