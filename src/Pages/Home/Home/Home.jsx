import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import BrandsWeHelped from '../BrandsWeHeped/BrandsWeHelped';
import CustomerReview from './CustomerReview/CustomerReview';

const Home = () => {
    return (
        <div className='space-y-9'>
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <OurServices></OurServices>
                <BrandsWeHelped></BrandsWeHelped>
                <CustomerReview></CustomerReview>
        </div>
    );
};

export default Home;