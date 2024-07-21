import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';

function PlaceOrder() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const total = queryParams.get('total') || 0;

    const [cartItems, setCartItems] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [payOnline, setPayOnline] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:4001/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Error fetching cart:', text);
                    throw new Error('Failed to fetch cart');
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (cashOnDelivery) {
            // Handle Cash on Delivery
            const formData = {
                cartItems,
                total
            };
    
            const response = await fetch("http://localhost:4001/api/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                console.log('Order placed successfully');
                redirectThankYou();
            } else {
                console.log('Order placement failed');
            }
        } else if (payOnline) {
            // Handle Online Payment
            const orderResponse = await fetch('http://localhost:4001/create-razorpay-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ total })
            });
    
            if (orderResponse.ok) {
                const orderData = await orderResponse.json();
                const options = {
                    key: 'rzp_test_q5lgytIZFU2N1j',
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: 'Cake Crafters',
                    description: 'Order Payment',
                    order_id: orderData.id,
                    handler: async (response) => {
                        const verifyResponse = await fetch('http://localhost:4001/verify-razorpay-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                cartItems,
                                total
                            })
                        });
    
                        if (verifyResponse.ok) {
                            console.log('Payment verified and order placed successfully');
                            redirectThankYou();
                        } else {
                            console.log('Payment verification failed');
                        }
                    },
                    prefill: {
                        name,
                        email,
                        contact
                    }
                };
    
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.log('Failed to create Razorpay order');
            }
        } else {
            alert("Please select a payment method.");
        }
    };
    

    const redirectThankYou = () => {
        window.location.href = "/thankyou"; 
    };

    return (
        <div className="container-fluid pt-5 pb-5 bg-light">
            <div className="container bg-white p-5 rounded shadow-sm">
                <header className="text-center mb-5">
                    <img src="Images/cake-2.jpg" alt="Delicious Cakes" className="img-fluid mb-4" />
                    <h2 className="text-success mb-3">Order Your Cake</h2>
                    <h4 className="text-primary mb-4">Fill in your details to place an order</h4>
                    <p className="text-muted">We deliver freshly baked cakes right to your doorstep. Just fill out the form below to place your order.</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="inputName" placeholder="Enter Your Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" placeholder="Enter Your Email" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputContact" className="form-label">Contact</label>
                            <input type="tel" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="form-control" id="inputContact" placeholder="Enter Your Contact Number" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="inputAddress" rows="3" placeholder="Enter Your Address" required></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputMessage" className="form-label">Message</label>
                        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" id="inputMessage" rows="3" placeholder="Enter Your Message (Optional)"></textarea>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Payment Method:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="cashOnDelivery" value="cashOnDelivery" checked={cashOnDelivery} onChange={() => { setCashOnDelivery(true); setPayOnline(false); }} />
                            <label className="form-check-label" htmlFor="cashOnDelivery">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="payOnline" value="payOnline" checked={payOnline} onChange={() => { setCashOnDelivery(false); setPayOnline(true); }} />
                            <label className="form-check-label" htmlFor="payOnline">
                                Pay Online (Razorpay)
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Place Order</button>
                </form>
            </div>
        </div>
    );
}

export default PlaceOrder;
