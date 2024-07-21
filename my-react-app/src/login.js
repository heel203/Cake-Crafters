import React, { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch("http://localhost:4001/submit-login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token in local storage
                localStorage.setItem('userEmail', email); // Store the user email in local storage
                console.log('User authenticated successfully');
                navigate('/');
            } else {
                console.error('Failed to authenticate user');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const showPassword = () => {
        const userPassword = document.getElementById('user_password');
        if (userPassword.type === 'password') {
            userPassword.type = 'text';
        } else {
            userPassword.type = 'password';
        }
    };

    return (
        <div className="admin-body" style={{backgroundImage: `url(/images/background_img.jpg)`}}>
            <div className="container login-box d-flex justify-content-center align-items-center">
                <div className="card login-form pl-4 pr-4 pb-4 pt-3 c1">
                    <form className="pb-3" onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 text-center">
                                <i className="fa-solid admin-icon fa-circle-user p-3"></i>
                            </div>
                        </div>

                        <div className="admin-heading text-center">
                            <h2>Log In</h2>
                        </div>
                        <div className="form-row mt-4">
                            <div className="form-group col-md-12">
                                <label htmlFor="username" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control form-input" id="email"
                                    placeholder="Enter Your Email" autoComplete="off" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <div className="mt-2 mb-2" id="error-username-msg"></div>
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="user_password" className="form-label">Password</label>
                                <input type="password" name="Password" className="form-control form-input" id="user_password"
                                    placeholder="Enter Your Password" required autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="mt-2 mb-2" id="error-password-msg"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={showPassword} id="gridCheck" />
                                <label className="form-check-label" id="check-show" htmlFor="gridCheck">
                                    Show Password
                                </label>
                            </div>
                        </div>

                        <hr />

                        <div className="form-row mt-4">
                            <div className="form-group col-md-12">
                                <p className="text-center">Don't Have An Account? &nbsp;<Link to="/signup">Signup</Link></p>
                            </div>
                        </div>

                        <input type="submit" name="submit" className="btn login-btn btn-info btn-block pl-4 pr-4 b1" value="Log In" id="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
