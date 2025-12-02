import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useSecureInstance from "../../../hooks/SecureInstance";

const AssaginRider = () => {
  const Instance = useSecureInstance();
  const modalRef=useRef()
  const { data: pendingParcels = [] } = useQuery({
    queryKey: ["paid-Parcels"],
    queryFn: () =>
      Instance.get(`/parcels`, {
        params: { deliveryStatus: "Pickup in progress" },
      }).then((res) => res.data),
  });
const handleModal=(parcel)=>{
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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssaginRider;
