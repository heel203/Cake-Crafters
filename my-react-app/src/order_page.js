import React from "react";
import Navbar from './navbar';
import Footerr from './footer';
import OrderTracker from "./order";

function OrderPage({cart}){
    return(
        <div>
            <Navbar cart={cart || []}/>
            <OrderTracker/>
            <Footerr/>
        </div>
    )
}

export default OrderPage;