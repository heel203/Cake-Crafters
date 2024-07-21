import React from 'react';
import Navbar from './navbar';
import Footerr from './footer';
import MapEmbed from './map';
import ContactForm from './contact_form';
function Contact({cart}){
    return(
        <div>
            <Navbar cart={cart || []}/>
            <ContactForm/>
            <MapEmbed/>
            <Footerr/>
        </div>
    )
}

export default  Contact;