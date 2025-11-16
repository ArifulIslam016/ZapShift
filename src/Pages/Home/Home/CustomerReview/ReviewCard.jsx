import React, { use } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ReviewCard = ({ reviewPromise }) => {
  const reviewData = use(reviewPromise);

  return (
    <Swiper 
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      loop={true}
        autoplay={true}
      spaceBetween={50}  
      coverflowEffect={{
        rotate: 30,
        stretch:'50%',
        depth: 200,
        scale:0.75,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination,Autoplay]}
      className="mySwiper"
    >
      {reviewData.map((review) => (
        <SwiperSlide>
          <div className="bg-white shadow-md rounded-2xl p-8  w-full max-w-md">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-3xl text-primary mb-4" />

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {review.review}
            </p>

            {/* Profile Section */}
            <div className="flex items-center gap-4">
              {/* Avatar Circle */}
              <div className="w-10 h-10 rounded-full bg-primary">
                {" "}
                <img
                  className="rounded-full"
                  src={review.user_photoURL}
                  alt=""
                />
              </div>

              {/* Name + Role */}
              <div>
                <h3 className="font-semibold text-title">{review.userName}</h3>
                <p className="text-sm text-gray-500">Senior Product Designer</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCard;
