import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureInstance from "../../../hooks/SecureInstance";
import { FcApprove } from "react-icons/fc";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const Riders = () => {
  const Instance = useSecureInstance();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["rider", "status"],
    queryFn: async () => {
      const res = await Instance.get("/riders");
      return res.data;
    },
  });
  const hanldeRiderStatus = (id, status, email) => {
    Instance.patch(`/riders/${id}`, { status, email }).then((res) => {
        // console.log(res.data.modifiedCount);
        refetch();
      if (res.data) {
        Swal.fire({
          title: "Update",
          text: `Apllication ${status}`,
          icon: "success",
        });
      }
    });
  };
  const handleApproved = (riderApplication) => {
    hanldeRiderStatus(riderApplication._id, "approved", riderApplication.email);
  };
  const handleRejected = (riderApplication) => {
    hanldeRiderStatus(riderApplication._id, "rejected", riderApplication.email);
  };
  return (
    <div>
      <h1>Total {riders.length} application found </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>District</th>
              <th>age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.district}</td>
                  <td>{rider.age}</td>
                  <td>
                    {rider.status === "pending" ? (
                      <span className="bg-yellow-300 px-2 py-1 rounded-2xl">
                        {rider.status}
                      </span>
                    ) : rider.status === "approved" ? (
                      <span className="bg-green-300 px-2 py-1 rounded-2xl">
                        {rider.status}
                      </span>
                    ) : (
                      <span className="bg-red-300 px-2 py-1 rounded-2xl">
                        {rider.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApproved(rider)}
                      className="btn mr-1"
                    >
                      <FcApprove />
                    </button>
                    <button
                      onClick={() => handleRejected(rider)}
                      className="btn mr-1"
                    >
                      <FaDeleteLeft />
                    </button>
                    <button className="btn mr-1">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Riders;
