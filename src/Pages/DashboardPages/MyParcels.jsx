import React from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import useAuthhooks from "../../hooks/Authhooks";
import { MdOutlineEditNote } from "react-icons/md";
import { FaMagnifyingGlass, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const { data, isLoading,refetch } = useQuery({
    queryKey: ["percels"],
    queryFn: async () => {
      return await Instance.get(`/parcels/?email=${user.email}`).then(
        (res) => res.data
      );
    },
  });
  //    console.log(data)
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  const handleDelete=(id)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Instance.delete(`/parcels/${id}`).then(res=> 
     {
     
       if(res.data.deletedCount){
        refetch()
           Swal.fire({
      title: "Deleted!",
      text: "Your pickup request has been deleted.",
      icon: "success"
    });
      }
     }
    )

  }
});
    
  }
  const handlePayment=async(percel)=>{
    const paymentInfo={
      percelName: percel?.parcelName,
    id: percel?._id,
    email: percel?.SenderEamil,
    cost: percel?.bearingCost,
    }
  const result=await  Instance.post(`create-checkout-session`,paymentInfo)
 window.location.assign(result.data.url)
  }
  return (
    <div>
      <h1 className="text-neutral text-3xl">
        Total {data?.length} percel found
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Reciver</th>
                <th>Total Cost</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((percel, index) => {
                return (
                  <tr key={index}>
                    <th>{index+1}</th>
                    <td>{percel?.parcelName}</td>
                    <td>{percel?.reciverName}</td>
                    <td>{percel?.bearingCost}</td>
                    <td>{percel?.paymentStatus==='paid'?<span className="text-white px-3 py-1 bg-green-600 rounded-2xl">Paid</span>:<button onClick={()=>handlePayment(percel)} className="btn btn-primary rounded-sm text-green-800">Pay</button>}</td>
                    <td className="text-yellow-400"><Link to={`/parcel/${percel.TracingId}`}>{percel?.deliveryStatus}</Link></td>
                    <td className="space-x-2">
                      <button className="btn">
                        <MdOutlineEditNote />
                      </button>

                      <button onClick={()=>handleDelete(percel._id)} className="btn">
                        <FaRegTrashCan />
                      </button>
                      <button  className="btn">
                        <FaMagnifyingGlass />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
