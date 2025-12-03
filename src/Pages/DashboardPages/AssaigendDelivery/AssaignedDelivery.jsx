import React from "react";
import useAuthhooks from "../../../hooks/Authhooks";
import useSecureInstance from "../../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssaignedDelivery = () => {
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const { data: pendingdeliveries = [], refetch: deliveryTaskRefetch } =
    useQuery({
      queryKey: ["pending-percels", "Rider assainge", user?.email],
      queryFn: async () => {
        const res = await Instance.get(
          `/parcels/rider?rideremail=${user.email}&deliverystatus=Rider%20assainge`
        );
        return res.data;
      },
    });
  // console.log(pendingdeliveries)
  const handleAcceptDelivery = (deliveryTask, status) => {
    const updatedStatus = { deliveryStatus: status ,riderId:deliveryTask.riderId,trackingId:deliveryTask.TracingId};
    Instance.patch(
      `parcels/${deliveryTask._id}/deleveryStatus`,
      updatedStatus
    ).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        deliveryTaskRefetch();
        Swal.fire({
          title: "Update",
          text: `${status.split("_").join(" ")}`,
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-4xl text-neutral ">
        Total pending Delivery: {pendingdeliveries.length}
      </h1>
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
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingdeliveries.map((deliveryTask, i) => (
              <tr key={deliveryTask._id}>
                <th>{i + 1}</th>
                <td>{deliveryTask.parcelName}</td>
                <td>{deliveryTask.SenderPhone}</td>
                <td>{deliveryTask.SenderAddress}</td>
                <td className=" flex gap-2">
                  {deliveryTask.deliveryStatus === "Rider assainge" ? (
                    <>
                      {" "}
                      <button
                        onClick={() =>
                          handleAcceptDelivery(deliveryTask, "Rider_Arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <h1>Accepted</h1>
                  )}
                </td>
                <td>
                  {deliveryTask.deliveryStatus !== "Rider assainge" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleAcceptDelivery(deliveryTask, "Picked_up");
                        }}
                        className={`btn btn-primary text-black`}
                        disabled={deliveryTask.deliveryStatus ==="Rider_Arriving"?false:true}
                      >
                        {deliveryTask.deliveryStatus==="Rider_Arriving"?"Pick up":"Alredy PikedUp"}
                      </button>
                      <button onClick={() => {
                          handleAcceptDelivery(deliveryTask, "Deliveried");
                        }} className="btn btn-primary text-black">
                        Deliveried
                      </button>
                    </div>
                  ) : (
                    <button className="btn">Not yet Accepted</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssaignedDelivery;
