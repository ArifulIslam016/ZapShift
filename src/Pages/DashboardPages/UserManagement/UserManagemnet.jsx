import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureInstance from "../../../hooks/SecureInstance";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const UserManagemnet = () => {
  const [searchKey,setSearchKey]=useState('')
  const Instance = useSecureInstance();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",searchKey],
    queryFn: async () => {
      const res = await Instance.get(`/users?searchKey=${searchKey}`);
      return res.data;
    },
  });
  const handleAddAdmin = (user) => {
    // Instance.patch(`/users/${user._id}`,{role:"admin"}).then(res=>{
    //   if(res.data.modifiedCount){
    //     refetch()
    //       Swal.fire({
    //           title: "Deleted!",
    //           text: `${user.displayName} now an admin`,
    //           icon: "success"
    //         });
    //   }
    // })
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Permit",
    }).then((result) => {
      if (result.isConfirmed) {
        Instance.patch(`/users/${user._id}`, { role: "admin" }).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user.displayName} now an admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    // Instance.patch(`/users/${user._id}`,{role:"user"}).then(res=>{
    //   if(res.data.modifiedCount){
    //     refetch()
    //       Swal.fire({
    //           title: "Deleted!",
    //           text: "Admin reverted to user",
    //           icon: "success"
    //         });
    //   }
    // })
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Instance.patch(`/users/${user._id}`, { role: "user" }).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Admin reverted to user",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-between mt-3">
        <h1 className="text-3xl text-neutral">User {users.length}</h1>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" onChange={(e)=>setSearchKey(e.target.value)} className="grow" placeholder="Search users" />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <td>#</td>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>User Manage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="bg-red-400 btn text-neutral"
                    >
                      <FaUserMinus />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddAdmin(user)}
                      className="bg-green-400 btn text-neutral"
                    >
                      <FaUserPlus />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-primary text-black btn-xs">
                    details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagemnet;
