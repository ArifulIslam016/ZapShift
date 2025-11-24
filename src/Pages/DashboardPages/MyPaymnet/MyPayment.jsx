import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useSecureInstance from '../../../hooks/SecureInstance';
import useAuthhooks from '../../../hooks/Authhooks';
import { Link } from 'react-router';

const MyPayment = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const{data,isLoading}=useQuery({
        queryKey:['payment',user?.email],
        queryFn:async()=>{
            const result=await Instance.get(`/paidsinfo?/${user.email}`)
            return result.data
        }
    })
if(isLoading){
    return <h1 className="text-center">Loading...</h1>
}
// console.log(data)
    return (
        <div>
            <h1>Total Payments :{data.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Name</th>
        <th>Tracking Id</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {data.map((payment,index)=> <tr key={index}>
        <th>{index+1}</th>
        <td>{payment.paidParcelName}</td>
        <td>{payment.TracingId}</td>
        <td><Link className="btn bg-primary px-3 text-neutral">View</Link></td>
      </tr>)}
      {/* row 2 */}
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyPayment;
//**paidParcelName 
// TracingId
// amount

//  */