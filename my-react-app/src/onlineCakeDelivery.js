import React from 'react';
import './index.css'; // Assuming you have your CSS file imported
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the CakeCard component with added styles
function CakeCard({ imageUrl, title, description }) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="cake-card bg-white">
                <img src={imageUrl} alt={title} className="cake-card-image" />
                <div className="cake-card-content">
                    <h5 className="cake-title">{title}</h5>
                    <p className="cake-description">{description}</p>
                    <button className="order-now-btn">Order Now</button>
                </div>
            </div>
        </div>
    );
}

// Define the OnlineCakeDelivery component
function OnlineCakeDelivery() {
    return (
        <div className="container-fluid pt-5 pb-5 online-cake-delivery speciality-products">
            <h1 className="text-center text-blue font-weight-500 pb-4 text-pink" data-aos="fade-down">What We Offer</h1>
            <h3 className="text-center text-blue font-weight-300 mb-5" data-aos="fade-up">Elevate Every Occasion with Our Irresistible Cakes</h3>

            <div className="row overflow-auto">
                <CakeCard 
                    imageUrl="images/anniversary-photo-cake.jpg" 
                    title="Anniversary Cake" 
                    description="Celebrate your special day with our exquisitely customized and beautifully crafted anniversary cakes." 
                />
                <CakeCard 
                    imageUrl="images/rakhi.jpg" 
                    title="Festive Cake" 
                    description="Add sweetness to your festivals with our delicious festive cakes, perfect for sharing joy." 
                />
                 <CakeCard 
                    imageUrl="images/birthday-cake.jpg" 
                    title="Birthday Cake" 
                    description="Make birthdays memorable with our range of themed birthday cakes, designed for every age." />
                
                <CakeCard 
                    imageUrl="images/cartoon-cakes_0.jpg" 
                    title="Cartoon Cake" 
                    description="Surprise your little ones with their favorite cartoon characters crafted into delicious cakes." 
                />
                <CakeCard 
                    imageUrl="Images/p-delish-motichoor-ladoo-cake-half-kg--188714-m.jpg" 
                    title="Ladoo Cake" 
                    description="
                    Indulge in the rich traditional flavors of India with our delightful and delicious Ladoo cakes." 
                />
                <CakeCard 
                    imageUrl="images/bomb-cake.jpg" 
                    title="Bomb Cake" 
                    description="Our bomb cakes are a delightful explosion of flavors that will leave you craving for more." 
                />
                
            </div>
        </div>
    );
}

export default OnlineCakeDelivery;
