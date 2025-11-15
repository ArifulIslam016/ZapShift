import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
3;
const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div >
        <img className="relative" src={img1} />
        <div className="absolute bottom-18 left-5 flex">
          <div className="flex items-center gap-1 mr-3">
            {" "}
            <button className="btn bg-primary px-3 py-1 rounded-4xl">Track Your Parcel</button>
            <BsArrowUpRightCircleFill className="text-4xl" />
          </div>
          <button className="btn btn-outline text-title">Be a Rider</button>
        </div>
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
    </Carousel>
  );
};

export default Banner;
