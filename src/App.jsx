import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import TrackingPage from './pages/tracking';
import './App.css';

function App() {
  const [cartItems, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const normalizeCart = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.items)) return value.items;
    if (Array.isArray(value?.cartItems)) return value.cartItems;
    return [];
  };

  useEffect(() => {
    axios.get('/api/cartItems-items?expand=product')
      .then((response) => {
        setCart(normalizeCart(response.data));
      })
      .catch((error) => {
        console.error('Error fetching cartItems:', error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cartItems} setCart={setCart} />} />
      <Route path="/checkout" element={ <CheckoutPage/>}/>
      <Route path="/orders" element={<OrdersPage cartItems={cartItems} orders={orders}/>}/>
      <Route path="/tracking" element={<TrackingPage cartItems={cartItems} />} />
    </Routes>
  );
}

export default App;
