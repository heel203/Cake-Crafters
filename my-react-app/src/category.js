import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function CakeCategories() {
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="container-fluid pt-5 pb-2">
            <h4 className="text-center text-green font-weight pb-1" data-aos="zoom-in">Our Cakes</h4>
            <h3 className="text-center text-blue font-weight mb-3" data-aos="zoom-in">Elevate Every Occasion with Our Irresistible Cakes</h3>

            <div className="container-fluid pt-2 pb-5">
                <div className="row no-gutters">
                    <CakeCategoryLink link="#chocolate" title="Chocolate" image="chocolate.jpg" description="Rich and creamy chocolate cake." />
                    <CakeCategoryLink link="#fruit" title="Fruit Cake" image="fruit.jpg" description="Fresh and fruity cake." />  
                    <CakeCategoryLink link="#blueberry" title="Blueberry" image="blueberry.jpg" description="Sweet and tangy blueberry cake." />
                    <CakeCategoryLink link="#butterscotch" title="Butterscotch" image="butterscotch.jpg" description="Smooth and buttery butterscotch cake." />
                    <CakeCategoryLink link="#redvalvet" title="Red Velvet" image="redvelvet.jpg" description="Deliciously moist red velvet cake." />
                    <CakeCategoryLink link="#vanilla" title="Vanilla" image="vanilla.jpg" description="Classic and delightful vanilla cake." />
                </div>
            </div>
        </div>
    );
}

function CakeCategoryLink({ link, title, image, description }) {
    return (
        <div className="col-lg-2 col-md-4 col-sm-6 col-12 p-3">
            <a href={link} className="card-link" data-toggle="tooltip" data-placement="top" title={description}>
                <div className="card card-border-radius" data-aos="zoom-in">
                    <div className="card-body pt-3 pb-1 text-center">   
                        <h5 className="card-title"><b>{title}</b></h5>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default CakeCategories;
