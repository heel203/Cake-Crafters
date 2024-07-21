import React from 'react';
import Navbar from './navbar';
import Footerr from './footer';
// import ExclusiveProductSection from './ExclusiveProduct';;
import OnlineCakeDelivery from './onlineCakeDelivery';
import SpecialitySection from './SpecialityProduct';
import HeroSection from './ExclusiveProduct';
import CustomerSection from './CustomerReview';
import SpecialOffers from './SpecialOffers';
function Home({cart}){
    return(
        <div>
            <Navbar cart={cart || []}/>
            <HeroSection/>
            <OnlineCakeDelivery/>
            <SpecialOffers/>
            <SpecialitySection/>
            <CustomerSection/>
            <Footerr/>
        </div>
    )
}

export default  Home; 