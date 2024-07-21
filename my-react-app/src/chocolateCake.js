import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChocolateCakeProduct({ id, imageUrl, name, price, addToCart }) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
            <div className="card card-border-radius" data-aos="fade-right">
                <div className="img-container p-3 border-radius">
                    <img src={imageUrl} className="card-img" alt={name} />
                </div>
                <div className="card-body pt-1 text-left">
                    <h5 className="card-title"><b>{name}</b></h5>
                    <p className="card-text text-left">Rs. {price}</p>
                    <button onClick={() => addToCart({ id, name, price })} className="btn btn-warning btn-block mb-2">Add To Cart</button>
                    <Link to={`/payment/${id}`} className="payment-href">
                        <button type="button" className="btn btn-success btn-block">Order Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ChocolateCakeSection() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4001/api/products/chocolate');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('You need to be logged in to add items to the cart.');
            navigate('/login'); // Redirect to login page
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4001/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    productID: product.id,
                    quantity: 1 // default quantity
                })
            });
    
            if (response.ok) {
                console.log('Item added to cart successfully');
                // Optionally, you can update some state or provide feedback to the user here
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.log('Error adding item to cart:', error);
        }
    };
    

    return (
        <div className="container-fluid mt-5 mb-5" id="chocolate">
            <div className="heading-line text-center mb-5" data-aos="zoom-in">
                <h1 className="heading-up text-center font-weight p-1 font-cursive">Chocolate Cake</h1>
            </div>
            <div className="container">
                <div className="row no-gutters pt-2">
                    {products.map(product => (
                        <ChocolateCakeProduct
                            key={product.ProductID}
                            id={product.ProductID}
                            imageUrl={product.ImageURL}
                            name={product.Name}
                            price={product.Price}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChocolateCakeSection;
