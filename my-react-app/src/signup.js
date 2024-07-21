import React, { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import 'swiper/css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        const formData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        const response = await fetch("http://localhost:4001/submit-signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log('form submitted')
            redirectToLogin();
        } else {
            console.log('failed')
        }
    }

    const redirectToLogin = () => {
        window.location.href = "/login"; // Redirect to login page
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='admin-body' style={{ backgroundImage: `url(/images/background_img.jpg)` }}>
            <div className="container login-box d-flex justify-content-center align-items-center">
                <div className="card login-form p-4 c1">
                    <form className="pb-3" onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 text-center">
                                <i className="fa-solid admin-icon fa-circle-user p-3"></i>
                            </div>
                        </div>

                        <div className="admin-heading text-center">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="form-row mt-4">
                            <div className="form-group col-md-12">
                                <label htmlFor="username" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control form-input" id="username"
                                    placeholder="Enter Your Email" autoComplete="off" required
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="mt-2 mb-2" id="error-username-msg"></div>
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="user_password" className="form-label">Password</label>
                                <input type={passwordVisible ? "text" : "password"} name="Password" className="form-control form-input" id="user_password"
                                    placeholder="Enter Your Password" autoComplete="off" required
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="mt-2 mb-2" id="error-password-msg"></div>
                            </div>
                        </div>

                        <div className="form-row mt-2">
                            <div className="form-group col-md-12">
                                <label htmlFor="user_password_confirm" className="form-label">Confirm Password</label>
                                <input type={passwordVisible ? "text" : "password"} name="CPassword" autoComplete="off" className="form-control form-input" id="user_password_confirm"
                                    placeholder="Confirm Your Password Here..." required
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <div className="mt-2 mb-2" id="error-confirm-password-msg"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={togglePasswordVisibility} id="gridCheck" />
                                <label className="form-check-label" id="check-show" htmlFor="gridCheck">
                                    Show Password
                                </label>
                            </div>
                        </div>

                        <hr />

                        <div className="form-row mt-4">
                            <div className="form-group col-md-12">
                                <p className="text-center">Already Have An Account? &nbsp;<Link to="/login">Login</Link></p>
                            </div>
                        </div>

                        <input type="submit" name="submit" className="btn login-btn btn-info btn-block pl-4 pr-4 b1" value="Sign Up"
                            id="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
    