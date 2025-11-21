import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useSecureInstance from '../../../hooks/SecureInstance';

const Success = () => {
    const Instance=useSecureInstance()
    const [searchParams]=useSearchParams()
const sessionId=searchParams.get('session_id')
    useEffect(()=>{
        Instance.patch(`/payment-status/?session_id=${sessionId}`)
    })

    return (
        <div>
            <h1>Payment Sucsessful</h1>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/dashboard/my-percels">Back to My Percel</Link>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/">Back to Home</Link>

        </div>
    );
};

export default Success;