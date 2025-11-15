import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';

const Home = () => {
    return (
        <div className='space-y-9'>
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <OurServices></OurServices>
        </div>
    );
};

export default Home;