import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './signup';
import Login from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './product';
import Contact from './Contact_page';
import OrderPage from './order_page';
import Home from './home';
import PlacePage from './place_page';
import CartPage from './cart';
import Dashboard from './Dashboard';
import ThankYouPage from './thankyou';
import ManageProducts from './ManageProducts';
import ViewOrders from './ViewOrders';
import ManageUsers from './ManageUsers';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute';

const Main = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => { 
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/product' element={<Product addToCart={addToCart} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/order' element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='/placeorder' element={<PlacePage />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ViewOrders />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
        <Route path="/cart" element={<ProtectedRoute><CartPage cart={cart} removeFromCart={removeFromCart} /></ProtectedRoute>} />
        <Route path='/thankyou' element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Main />);
