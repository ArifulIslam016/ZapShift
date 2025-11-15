import React from 'react';
import imgvan from '../../../assets/bookingIcon.png'

const HowItWorks = () => {
    return (
        <div className='px-3 lg:px-[150px] mb-10'>
            <h1 className=' text-title font-extrabold text-3xl mt-20 mb-5'>How it works</h1>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='p-8 bg-gray-50 shadow-xl rounded-2xl box-border max-w-[302px]'>
                    <img className='mt-5 mb-3' src={imgvan} alt="" />
                    <h5>Booking Pick Drop</h5>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-8 bg-gray-50 shadow-xl  rounded-2xlbox-border max-w-[302px]'>
                    <img className='mt-5 mb-3' src={imgvan} alt="" />
                    <h5>Booking Pick Drop</h5>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-8 bg-gray-50 shadow-xl rounded-2xl box-border max-w-[302px]'>
                    <img className='mt-5 mb-3' src={imgvan} alt="" />
                    <h5>Booking Pick Drop</h5>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-8 bg-gray-50 shadow-xl rounded-2xl box-border max-w-[302px]'>
                    <img className='mt-5 mb-3' src={imgvan} alt="" />
                    <h5>Booking Pick Drop</h5>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;