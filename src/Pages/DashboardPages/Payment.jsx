import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useSecureInstance from '../../hooks/SecureInstance';

const Payment = () => {
    const id=useParams().id
    console.log(id)
    const Instance=useSecureInstance()
    const {data}=useQuery({
        queryKey:['payment',id],
        queryFn:async()=> {
            const res= await Instance.get(`/parcels/${id}`)
            return res.data
        }
    })
    console.log(data)
    return (
        <div>
       <h1>{data?.parcelName}</h1>
        </div>
    );
};

export default Payment;