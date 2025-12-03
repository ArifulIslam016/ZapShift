import React from 'react';
import useAuthhooks from '../../../hooks/Authhooks';
import useSecureInstance from '../../../hooks/SecureInstance';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssaignedDelivery = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const{data:pendingdeliveries=[],refetch:deliveryTaskRefetch}=useQuery({
        queryKey:['pending-percels','Rider assainge',user?.email],
        queryFn:async()=>{
           const res=await Instance.get(`/parcels/rider?rideremail=${user.email}&deliverystatus=Rider%20assainge`)
           return res.data
        
        }
    })
    // console.log(pendingdeliveries)
    const handleAcceptDelivery=(deliveryTask)=>{
     const updatedStatus={deliveryStatus:'Rider_Arriving'}
      Instance.patch(`parcels/${deliveryTask._id}/deleveryStatus`,updatedStatus).then(res=>{
        console.log(res.data)
         if (res.data.modifiedCount) {
          deliveryTaskRefetch()
                    Swal.fire({
                      title: "Update",
                      text: `Delivery Accpepted`,
                      icon: "success",
                    });
           }
      })
    }
    return (
        <div>
            <h1 className='text-4xl text-neutral '>Total pending Delivery: {pendingdeliveries.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Name</th>
        <th>SenderPhone</th>
        <th>Sender Address</th>
        <th>Confirm</th>
      </tr>
    </thead>
    <tbody>
      {pendingdeliveries.map((deliveryTask,i)=><tr key={deliveryTask._id}>
        <th>{i+1}</th>
        <td>{deliveryTask.parcelName}</td>
        <td>{deliveryTask.SenderPhone}</td>
        <td>{deliveryTask.SenderAddress}</td>
        <td className=' flex gap-2'>
            <button onClick={()=>handleAcceptDelivery(deliveryTask)} className='btn btn-primary text-black'>Accept</button>
            <button className='btn btn-warning text-black'>Reject</button>
        </td>
      </tr>)}
      
     
  
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AssaignedDelivery;