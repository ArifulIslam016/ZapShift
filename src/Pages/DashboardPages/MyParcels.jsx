import React from 'react';
import useSecureInstance from '../../hooks/SecureInstance';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {
    const Instance=useSecureInstance()
  const {data}=useQuery({
    queryKey:['percels'],
    queryFn:()=>{
     return Instance.get('/parcels').then(res=>res.data)
    }
  })
   console.log(data)
    return (
        <div>
            <h1>Its My parcel sectionn tota {data?.length}  percel found</h1>
        </div>
    );
};

export default MyParcels;