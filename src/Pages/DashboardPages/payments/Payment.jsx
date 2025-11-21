import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useSecureInstance from "../../../hooks/SecureInstance";

const Payment = () => {
  const id = useParams().id;
  console.log(id);
  const Instance = useSecureInstance();
  const { data,isLoading } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await Instance.get(`/parcels/${id}`);
      return res.data;
    },
  });
if(isLoading){
    return <span className="loading loading-spinner loading-xl"></span>;
}
  const paymentInfo = {
    percelName: data?.parcelName,
    id: data?._id,
    email: data?.SenderEamil,
    cost: data?.bearingCost,
  };

  const handlePayment = async () => {
   const res=await Instance.post(`create-checkout-session`, paymentInfo);
    window.location.href=res.data.url
  };
  return (
    <div>
      <h1>{data?.parcelName}</h1>
      <button onClick={handlePayment} className="btn btn-primary rounded-2xl px-3 text-black">Pay Now</button>
    </div>
  );
};

export default Payment;
