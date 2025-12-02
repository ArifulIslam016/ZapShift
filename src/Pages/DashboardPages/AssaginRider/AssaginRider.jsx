import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useSecureInstance from "../../../hooks/SecureInstance";

const AssaginRider = () => {
  const Instance = useSecureInstance();
  const modalRef=useRef()
  const [selectecPrcel,setSelectedParcel]=useState(null)
  const { data: pendingParcels = [] } = useQuery({
    queryKey: ["paid-Parcels"],
    queryFn: () =>
      Instance.get(`/parcels`, {
        params: { deliveryStatus: "Pickup in progress" },
      }).then((res) => res.data),
  });
  const {data:riders=[]}=useQuery({
      enabled:!!selectecPrcel,
    queryKey:['riders', selectecPrcel?.senderDistrict,'availabe'],
    queryFn:async()=> {
        const res= await Instance.get(`/riders?status=approved&workingStatus=available&district=${selectecPrcel?.senderDistrict}`)
        return res.data
    }
  })
const handleModal=(parcel)=>{
    setSelectedParcel(parcel)
    modalRef.current.showModal()
}
  return (
    <div>
      <h1>Total Pending Parcesl{pendingParcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>SenderName</th>
              <th>Tracking Id</th>
              <th>Sender District</th>
              <th>Sender Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingParcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.SenderName}</td>
                <td>{parcel.TracingId}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.SenderPhone}</td>

                <td>
                  <button onClick={()=>handleModal(parcel)} className="btn btn-primary text-neutral">
                    Assaing Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{riders.length}!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssaginRider;
