import React from 'react';
import serviceimg from '../../../assets/service.png'
const OurServices = () => {
    return (
        <div className='px-5 md:px-14 lg:px-28 py-25 bg-[#03373D] text-center rounded-2xl my-25'>
            <h1 className='text-5xl text-white mb-2'>Our Sevices</h1>
            <p className='max-w-3xl mx-auto py-3 text-white text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
               
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4 '>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4'>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4'>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4'>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4'>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>
                <div className='p-8 bg-white rounded-2xl hover:bg-primary space-y-4'>
                    <img src={serviceimg} alt="" />
                    <h5>Booking Pick & Drop</h5>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                </div>

            </div>
            
        </div>
    );
};

export default OurServices;