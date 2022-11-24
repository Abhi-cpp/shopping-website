import React, { useState } from 'react';
import { SiPuma } from 'react-icons/si';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
//import {Link} from 'react-router-dom';
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { color } from '@mui/system';
import { API_CLIENT } from '../shared/services/api-client';

export default function Header() {

  const [sup, setSup] = useState(0);

  async function fetchSup () {

    const token = localStorage.getItem("TOKEN");
          if (token) {
               await API_CLIENT.get(process.env.REACT_APP_CART_TOTAL_URL, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  },
              })
                  .then(res => {
                      console.log("ha",res);
                      setSup(res.data.result);
                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
  }

  useEffect(() => {
    fetchSup();
}, []);




  const navigate = useNavigate()
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    < Link to="/home"className="navbar-brand" href="#"> <SiPuma size="2.5em"  /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#"><li className="nav-item">
        <Link to="/men" className="dropdown-item" aria-current="page">Men</Link>
        </li></a></li>
            <li><a className="dropdown-item" href="#"><li className="nav-item">
        <Link to="/women" className="dropdown-item" aria-current="page" href="#">Women</Link>
        </li></a></li>
            <li><a className="dropdown-item" href="#"><li className="nav-item">
        <Link to="/kids" className="dropdown-item" aria-current="page" href="#">Kids</Link>
        </li></a></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex header-r">
      <Link to="/orders"className="btn btn-dark" type="submit"><StorefrontIcon fontSize="large"/></Link>
        <Link to="/cart"className="btn btn-dark" type="submit"><ShoppingCartIcon fontSize="large"/>
        <sup>{sup}</sup>
        </Link>
        <button className="btn btn-dark" type="submit"><AccountCircleIcon fontSize="large"/>
        <div >
            <div className='profile'>
                <span> {localStorage.getItem('NAME')} </span>
                <button className='logout' onClick={() => {localStorage.clear()
 navigate('/')
                    }}
                > LOGOUT </button>
            </div>
            </div>
         </button>

      </form>
    </div>
  </div>
  
</nav>
      
    </>
    
  )
}
