import React from "react";
import useAuthhooks from "../../../hooks/Authhooks";
import useSecureInstance from "../../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";

const RiderCompletedDeliveries = () => {
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const { data: Completeddeliveries = [], refetch: deliveryTaskRefetch } =
    useQuery({
      queryKey: ["pending-percels", "Rider assainge", user?.email],
      queryFn: async () => {
        const res = await Instance.get(
          `/parcels/rider?rideremail=${user.email}&deliverystatus=Deliveried`
        );
        return res.data;
      },
    });
    console.log(Completeddeliveries)
  return (
    <div>
      <div>
        <h1 className="text-4xl text-neutral ">
          Total pending Delivery: {Completeddeliveries.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>TrackingId</th>
                <th>ParcelCoast</th>
                <th>PayoutAmount</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {Completeddeliveries.map((deliveryTask, i) => (
                <tr key={deliveryTask._id}>
                  <th>{i + 1}</th>
                  <td>{deliveryTask.parcelName}</td>
                  <td>{deliveryTask.TracingId}</td>
                  <td>{deliveryTask.bearingCost}</td>
                  <td>{deliveryTask.reciverDistrict===deliveryTask.senderDistrict?deliveryTask.bearingCost*0.8:deliveryTask.bearingCost*0.6}</td>
                  <td className=" flex gap-2">
                    <button className="btn btn-primary text-neutral">Withdraw</button>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiderCompletedDeliveries;
