import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecureInstance from '../../../hooks/SecureInstance';

const AssaginRider = () => {
    const Instance=useSecureInstance()
    const {data:pendingParcels=[]}=useQuery({
        queryKey:['paid-Parcels'],
        queryFn:()=> Instance.get(`/parcels`,{params:{deliveryStatus:"Pickup in progress"}}).then((res)=>res.data)
    
        
    })
    return (
        <div>
            {pendingParcels.length}
        </div>
    );
};

export default AssaginRider;
