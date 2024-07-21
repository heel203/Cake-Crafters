// Footer.js
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <div className="shadow">
            <footer className="footer">
                <h1 className="footer-heading p-5">Cake Crafters</h1>
                <div className="container">
                    <div className="row p-4">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12 pl-3 pr-3 pb-3">
                            <h5 className="mb-3">Home</h5>
                            <ul>
                                <li className="mb-2"><a className="footer-link" href=""><i className="fa-solid fa-angles-right pr-2"></i>Category</a></li>
                                <li className="mb-2"><a className="footer-link" href=""><i className="fa-solid fa-angles-right pr-2"></i>Reviews Us</a></li>
                                <li className="mb-2"><a className="footer-link" href=""><i className="fa-solid fa-angles-right pr-2"></i>Gallery</a></li>
                            </ul>
                        </div>
                        {/* Add similar divs for Category, Trending, and Contact */}
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12 pl-3 pr-3 pb-3">
                        <h5 className="mb-3">Category</h5>
                        <ul>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Choclate</a>
                            </li>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Pineapple</a>
                            </li>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Themed</a></li>
                        </ul>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12 pl-3 pr-3 pb-3">
                        <h5 className="mb-3">Trending</h5>
                        <ul>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Bomb Cake</a>
                            </li>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Fondant Cake</a></li>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>Lava Cake</a></li>
                        </ul>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12 pl-3 pr-3 pb-3">
                        <h5 className="mb-3">Contact</h5>
                        <ul>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>+91 123456789</a>
                            </li>
                            <li className="mb-2"><a className="footer-link" href="#"><i className="fa-solid fa-angles-right pr-2"></i>cakecrafters@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    </div>

                    <div className="footer-line mt-3"></div>

                    <div className="row row-icon text-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3 mb-3">
                            <h5 className="icon-description mb-4">Follow Us</h5>
                            <a href="https://web.whatsapp.com" className="footer-icon-link"><i className="fa-brands fa-whatsapp footer-icon"></i></a>
                            <a href="https://www.instagram.com/" className="footer-icon-link"><i className="fa-brands fa-instagram footer-icon"></i></a>
                            <a href="https://www.facebook.com/" className="footer-icon-link"><i className="fa-brands fa-facebook footer-icon"></i></a>
                            <a href="https://www.twitter.com/" className="footer-icon-link"><i className="fa-brands fa-twitter footer-icon"></i></a>
                        </div>
                    </div>

                    <div className="footer-line"></div>
                </div>

                <div className="footer-copyright text-center p-3">
                    <h6 className="copyright">Copyright &#169; 2023 | All Rights Reserved By <span className="copyright-name">Cake Crafters</span></h6>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
