import React from 'react';
import './index.css'; // Ensure your CSS file is imported
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the SpecialOffers component
function SpecialOffers() {
    return (
        <div className="container special-offers-container py-5">
            <h3 className="special-offers-title mb-4">Special Offers</h3>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card special-offers-card p-3 h-100">
                        <div className="card-body text-center">
                            <h5 className="special-card-title">10% off on Anniversary Cakes</h5>
                            <p className="special-card-text">Celebrate love with our special discounts on anniversary cakes.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card special-offers-card p-3 h-100">
                        <div className="card-body text-center">
                            <h5 className="special-card-title">Buy one, get one free on Festive Cakes</h5>
                            <p className="special-card-text">Enjoy our festive cakes with an amazing buy one, get one free offer.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card special-offers-card p-3 h-100">
                        <div className="card-body text-center">
                            <h5 className="special-card-title">Free delivery on orders over $50</h5>
                            <p className="special-card-text">Get free delivery when you spend over $50 on your favorite cakes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialOffers;
