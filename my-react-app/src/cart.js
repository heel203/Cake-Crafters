import React, { useState, useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import Footer from './footer';
import { Link } from 'react-router-dom';

function CartPage() {
    const [cart, setCart] = useState([]);

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
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (index) => {
        const item = cart[index];
        try {
            const response = await fetch(`http://localhost:4001/api/cart/${item.ProductID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setCart(cart.filter((_, i) => i !== index));
            } else {
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const total = cart.reduce((acc, item) => acc + item.Price * item.Quantity, 0);

    return (
        <div>
            <Navbar cart={cart} />
            <div className="container">
                <h2 className="mt-5 mb-3">Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Name}</td>
                                <td>{item.Quantity}</td>
                                <td>Rs. {item.Price}</td>
                                <td>Rs. {item.Price * item.Quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-right">
                    <h3>Total: Rs. {total}</h3>
                    <Link to={`/placeorder?total=${total}`} className="btn btn-primary mt-3">
                        Place Order
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CartPage;
