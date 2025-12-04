import React from "react";
import useSecureInstance from "../../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";

const DashboardAdminHomepage = () => {
  const Instance = useSecureInstance();
  const { data: ParcelsActions = [] } = useQuery({
    queryKey: ["parcels-status-stat"],
    queryFn:async()=>{
        const res= await Instance.get('/parcels/status/stat')
    
        return res.data
    }
  });
  return (
    <div>
      <h1 className="text-4xl text-neutral">Parcel Actions</h1>
      <div className="stats shadow mx-auto flex justify-center max-w-10/11 ">
       {ParcelsActions.map(stat=>{
        return <div key={stat._id} className="stat border">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-2xl text-neutral">{stat?._id?<span>{stat._id}</span>:"Parcel Created"}</div>
          <div className="stat-value">{stat.count}</div>
          <div className="stat-desc"></div>
        </div>
       })}
      </div>
    </div>
  );
};

export default DashboardAdminHomepage;
