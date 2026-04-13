import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Banner from '../Home/Banner';
import OurServices from './Service/OurServices';
import ClientLogoMarquee from './ClientLogoMarquee/ClientLogoMarquee';
import FeatureSections from './FeatureSections/FeatureSections';
import BeMerchant from './Bemerchant/BeMerchant';
import HowItWorks from './HowItWorks/HowItWorks';
import CustomerReviews from './CustomerReviews/CustomerReviews';


const Home = () => {
    return (
        <div className='bg-base-200'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientLogoMarquee></ClientLogoMarquee>
            <FeatureSections></FeatureSections>
            <BeMerchant></BeMerchant>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;