import React from "react";
import customerTopImg from '../../../../assets/customer-top.png'
import ReviewCard from "./ReviewCard";
const reviewPromise= fetch('./data/reviews.json').then(res=>res.json())
const CustomerReview = () => {
    
  return (
    <div>
      <div className="max-w-4xl flex flex-col justify-center items-center text-center space-y-5">
        <img src={customerTopImg} alt="" />
        <h1 className="text-5xl font-extrabold text-neutral ">
          What our customers are sayings
        </h1>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
    <ReviewCard reviewPromise={reviewPromise}></ReviewCard>
    </div>
  );
};

export default CustomerReview;
