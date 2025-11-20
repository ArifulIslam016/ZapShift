import React from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import useAuthhooks from "../../hooks/Authhooks";

const MyParcels = () => {
  const {user}=useAuthhooks()
  const Instance = useSecureInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["percels"],
    queryFn: async() => {
      return await Instance.get(`/parcels/?email=${user.email}`).then((res) => res.data);
    },
  });
  //    console.log(data)
  if (isLoading) {
    return <h1> Loading.........</h1>;
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((percel, index) => {
               return <tr>
                  <th>{index}</th>
                  <td>{percel?.parcelName}</td>
                  <td>{percel?.reciverName}</td>
                  <td>{percel?.bearingCost}</td>
                  <td>paid/unpaind</td>
                  <td>Actions....</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
