//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './My-component/Header';
// import Banner from './My-component/Banner';
// import {PizzaCard} from './My-component/Card';
import Men from './My-component/men';
// import Footer from './My-component/Footer';
import Signup from './My-component/Signup';
import Signin from './My-component/Signin';
import Home from './My-component/Home';
import Women from './My-component/women';
import Kids from './My-component/kids';
// import Amazon from './My-component/amazon';
// import Navbar from './My-component/navbar';
import React, { useState, useEffect } from "react";
import Seller from './My-component/seller';
import Admin from './My-component/Admin';
import Update from './My-component/Update';
import OrderCart from './My-component/OrderCart';
import Order from './My-component/order';
function App() {

  const [product, setProduct] = useState('');

  return (
    <>

      {/* <Header /> */}
      {/* <div className="container">
    <Banner/>
    </div>
    <Carding /> */}
      <Routes>
        {/* <Route path="/" element={<div className="container"><Banner/> </div>}/>  */}
        <Route path="/" element={<Signin />} />
        <Route path="/men" element={<Men />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/cart" element={<OrderCart />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/admin" element={<Admin setProduct={setProduct} />} />
        <Route path="/update" element={<Update productObj={product} />} />


        {/* <Route path="/women" element={<Men/>}/> */}
      </Routes>

      {/* <Footer /> */}

    </>
  );

}

export default App;      
