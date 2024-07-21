import React from "react";
import Navbar from './navbar';
import Footerr from './footer';
import PlaceOrder from "./place_order";

function PlacePage({cart}){
    return(
        <div>
            <Navbar cart={cart || []}/>
            <PlaceOrder/>
            <Footerr/>
        </div>
    )
}

export default PlacePage;
