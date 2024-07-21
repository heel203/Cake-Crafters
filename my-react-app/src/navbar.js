import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ cart }) {
    const [cartCount, setCartCount] = useState(0);
    const [userEmail, setUserEmail] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCartCount(cart.length);
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
    }, [cart]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setUserEmail(null);
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{ fontSize: '23px', fontWeight: 'bolder', backgroundColor: '#ffffff' }}>
            <img src="/images/final_logo2.png" width="260" height="90" className="d-inline-block align-top" alt="" />
            <a className="navbar-brand" href="#">
                {/* Cake Crafters */}
            </a>
            <button className="navbar-toggler" type="button" onClick={toggleOffcanvas}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                    <button type="button" className="btn-close text-reset" onClick={toggleOffcanvas}></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">PRODUCT</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">CONTACT</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order" className="nav-link">ORDER</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fa-solid fa-cart-shopping nav-icon">
                                    <span className="badge badge-danger">
                                        {cartCount}
                                    </span>
                                </i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen ? 'true' : 'false'}>
                                <i className="fa-solid fa-user nav-icon"></i>
                                {userEmail && <span className="ml-2">{userEmail}</span>}
                            </a>
                            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                {userEmail ? (
                                    <>
                                        <a className="dropdown-item" href="#">Profile</a>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                    </>
                                ) : (
                                    <button className="dropdown-item" onClick={handleLoginRedirect}>Login</button>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
