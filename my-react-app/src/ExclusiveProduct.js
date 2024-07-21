import React from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HeroSection() {
    return (
        <div className="hero-section d-flex align-items-center">
            <div className="hero-text">
                <h1 className="hero-title">Delicious</h1>
                <h2 className="hero-subtitle">CAKES FOR YOU</h2>
                <p className="hero-description">Sweet Bakery offers the best cakes and sweets for you.</p>
                <button className="shop-now-btn">Shop Now</button>
            </div>
            <div className="hero-image-container">
                <img src="./images/hero-img2.jpeg" className="hero-image" alt="Delicious cake" />
            </div>
        </div>
    );
}

export default HeroSection;
