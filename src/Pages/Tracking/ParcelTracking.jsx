import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosHooks from "../../hooks/AxiosHooks";

const ParcelTracking = () => {
  const trackingId = useParams().trackingId;
  const axisosInstance = useAxiosHooks();
  const { data: trackingLogs = [] } = useQuery({
    queryKey: [trackingId, "trackings"],
    queryFn: async () => {
      const res = await axisosInstance.get(`trackings/${trackingId}`);
      return res.data;
    },
  });
  return (
    <div className="max-w-6xl mx-auto"> 
     <h1 className="text-2xl text-neutral font-semibold"> This is tracing sections for{trackingId}</h1>
      <ul className="timeline timeline-vertical py-10">
        {trackingLogs.map((log,index)=> <li key={index}>
          <div className="timeline-start">{new Date(log.createdAt).toLocaleString()}</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">
           {log.deltails}
          </div>
          <hr />
        </li>
            
        )}
       
        
      </ul>
    </div>
  );
};

export default ParcelTracking;
