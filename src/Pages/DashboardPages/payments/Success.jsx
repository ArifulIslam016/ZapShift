import React from 'react';
import { Link } from 'react-router';

const Success = () => {
    return (
        <div>
            <h1>Payment Sucsessful</h1>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/dashboard/my-percels">Back to My Percel</Link>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/">Back to Home</Link>

        </div>
    );
};

export default Success;