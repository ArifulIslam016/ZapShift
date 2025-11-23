import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useSecureInstance from '../../../hooks/SecureInstance';

const Success = () => {
    const [paymentInfo,setPaymentInfo]=useState({})
    const Instance=useSecureInstance()
    const [searchParams]=useSearchParams()
const sessionId=searchParams.get('session_id')
    useEffect(()=>{
     if(sessionId){
           Instance.patch(`/payment-status/?session_id=${sessionId}`).then(res=>{
            setPaymentInfo({
                TansactionId:res.data.TransactionId,
                TracingId:res.data.TracingId,
            })
            // console.log(res.data)
           })
     }
    },[sessionId])
// console.log(paymentInfo)
    return (
        <div className='max-w-[400px] mx-auto min-h-screen my-auto space-y-4 text-center mt-10 p-10 bg-gray-50 rounded-2xl'> 
            <h1>Payment Sucsessful</h1>
            <h1>Your Tacking Id: {paymentInfo.TracingId}</h1>
            <h1>Your Transaction Id: {paymentInfo.TansactionId}</h1>
           <div className='flex gap-3'>
             <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/dashboard/my-percels">Back to My Percel</Link>
            <Link className='text-black px-3 rounded-2xl btn btn-primary' to="/">Back to Home</Link>
           </div>

        </div>
    );
};

export default Success;
