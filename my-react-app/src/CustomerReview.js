import React from 'react';
import './index.css'; // Ensure your CSS file is imported
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the CustomerReview component
function CustomerReview({ text, name }) {
    return (
        <div className="col-md-6 mb-4">
            <div className="customer-review card card-border-radius p-3">
                <div className="card-body">
                    <p className="customer-review-text">"{text}"</p>
                    <p className="customer-name text-right">- {name}</p>
                </div>
                <div className="text-center mt-3">
                    <i className="fas fa-star text-pink"></i>
                    <i className="fas fa-star text-pink"></i>
                    <i className="fas fa-star text-pink"></i>
                    <i className="fas fa-star text-pink"></i>
                    <i className="fas fa-star-half-alt text-pink"></i>
                </div>
            </div>
        </div>
    );
}

// Define the CustomerSection component
function CustomerSection() {
    return (
        <div className="container-fluid pt-5 pb-5 bg-light">
            <h1 className="text-center text-pink mb-4 font-weight-500">TESTIMONIALS</h1>
            <div className="container">
                <div className="row">
                    <CustomerReview 
                        text="Absolutely delicious cakes! Every bite was a delight. Highly recommended!" 
                        name="John Doe" 
                    />
                    <CustomerReview 
                        text="Ordered a birthday cake for my son, and it was a hit! Thank you for making his day extra special." 
                        name="Jane Smith" 
                    />
                </div>
            </div>
        </div>
    );
}   
export default CustomerSection;
