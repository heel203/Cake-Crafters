import React from 'react';
import '../index.css'; // Assuming you have your CSS file imported
import 'bootstrap/dist/css/bootstrap.min.css';

function GalleryCard({ imageUrl, title, description }) {
    return (
        <div className="col mb-4">
            <div className="card card-border-radius text-white" data-aos="fade-right">
                <img src={imageUrl} className="card-img" alt="..." />
                <div className="card-img-overlay card-content-overlay bg-transparentgreen">
                    <h5 className="card-title"><b>{title}</b></h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Last updated 3 mins ago</p>
                </div>
            </div>
        </div>
    );
}

function GallerySection() {
    return (
        <div className="container-fluid pt-5 pb-5" style={{ backgroundColor: '#ffe9e9' }}>
            <h4 className="text-center text-blue font-weight pb-2" data-aos="zoom-in">Our Gallery</h4>
            <h3 className="text-center text-blue font-weight mb-5" data-aos="zoom-in">Layers of Happiness: Cakes for Every Celebration</h3>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3">
                    <GalleryCard
                        imageUrl="Images/sq-black-forest-cake0001chbl-C_1.jpg"
                        title="Indulge in the Dark Delight: Black Forest Magic!"
                        description="Black Forest cake is a delectable and indulgent dessert. This iconic cake is known for its rich, layered composition of chocolate and cherry crush which just melt in the mouth and is super moist."
                    />
                    <GalleryCard
                        imageUrl="Images/sq-red-velvet-cake0027reex-AD_0.jpg"
                        title="Velvet Dreams: Indulge in the Luxury of Red Velvet Cake."
                        description="Red velvet cake is typically layered with a smooth and creamy cream cheese frosting, which complements the cake's flavors beautifully."
                    />
                    <GalleryCard
                        imageUrl="Images/sq-round-luscious-rasmalai-cake-cake2370rasm-AB.jpg"
                        title="Experience India's Sweetest Secret: Rasmalai Cake Magic"
                        description="Rasmalai cake is a delightful fusion of two beloved desserts, combining the classic Indian sweet, Rasmalai, with the indulgent charm of cake."
                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <GalleryCard
                            imageUrl="Images/cake-1.jpg"
                            title="Satisfy Your Chocolate Cake Cravings."
                            description="Chocolate cake is a universally adored dessert that needs no introduction. It's a decadent masterpiece that has won the hearts of sweet enthusiasts worldwide."
                        />
                    </div>
                    <div className="col-sm-6">
                        <GalleryCard
                            imageUrl="Images/cake-2.jpg"
                            title="Golden Dreams: Butterscotch Cake Perfection."
                            description="Butterscotch cake is a delightful dessert that captivates with its rich, caramelized flavor and irresistible sweetness. This cake is a celebration of all things buttery and sugary, featuring layers of moist, golden cake infused with the warm essence of butterscotch."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GallerySection;
