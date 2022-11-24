import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_CLIENT } from "../shared/services/api-client";
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Footer from "./Footer";
import Card from "react-bootstrap/Card";





const OrderCart = () => {
  const [load, setLoad] = useState(true);

    const navigate = useNavigate()
    const [cart, setCart] = useState([]);
    const [add, setAdd] = useState('');
    const [phn, setPhn] = useState('');
    const [total, setTotal] = useState(0);
    let cardStyle = {
        
        width: "40px",
        margin : "0 10 0 0 "
      };
    
    
    const [qt, setQt]  = useState(1);
    async function fetch() {
        const token = localStorage.getItem("TOKEN");
        console.log(token);
        if (token) {
            await API_CLIENT.get(process.env.REACT_APP_CART_FETCH_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => {
                    console.log("uhumm" , res.data.cart);
                    const obj = res.data.cart;
                    console.log(obj[0]);
                    obj.map(shoe => setTotal(total => total + shoe.price))
                    setCart(obj);
                    setLoad(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }
    // console.log("xcvbn555555");


    useEffect(() => {
        const token = localStorage.getItem('TOKEN')
      if (!token) {
          navigate('/')
      }
        fetch();
        // console.log("cart data ", cart);
    }, [])

    const inc = () =>{
        setQt(qt + 1);
    }
    const dec = () =>{
        if(qt > 1)
        {
            setQt(qt - 1);
        }
    }
    const remove = (shoe) =>{
        const token = localStorage.getItem("TOKEN");

        const result = API_CLIENT.post(process.env.REACT_APP_DELETE_CART_URL, {
            headers :{
                'Authorization': `Bearer ${token}`
            },
            data : {
                shoe
            }

            

        })
        window.location.reload()

    }

    const placeOrder = () =>{


            console.log("########____________&&&&&&&&&&&&")
            const obj = {
                "cart" : {cart},
                "address" : {add},
                "phoneno" : {phn},
            }
            const token = localStorage.getItem("TOKEN");
            const result = API_CLIENT.post(process.env.REACT_APP_ORDER_URL, {
                headers :{
                    'Authorization': `Bearer ${token}`
                },
                obj
            })
    
    
    
            alert("Order placed");
            navigate('/orders')

        
    }

    const createCard = (shoe) =>{
        return (
            <div className='order-card' >{cardInternal(shoe)}</div>

        )
    }

    const cardInternal = (shoe) =>{
        return (
            <><Card.Img variant="top" src={shoe.image} style={cardStyle}/>
            <div className='order-item'>{shoe.product}</div><div className='order-qty'>
                Qty<button className='qty-btn' onClick={dec}>-</button>
                <input type='text' className='qty-input' value={qt}/>
                <button className='qty-btn' onClick={inc}>+</button>
            </div><div className='order-price'>Rs{shoe.price}</div><button className='delete-btn' onClick={() => remove(shoe) }>Remove</button></>
        )
    }



    return (
        <>
        <Header/>
            <div className='order-area'>
                <div className='order-total'>Your Cart Items</div>
            </div>
            {load  ?  <><Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack> </>:cart.map((shoe,index) => createCard(shoe))}

    <h2>CART TOTAL : Rs {total}</h2>

            <h1 className="center"> DETAILS </h1>
        <div className="outcard">
            Address
            <input
                onChange={(e) => {
                    setAdd(e.target.value)
                }}
                // value={email}
                required = "true"
                className="inputs"
                /> <br /> <br />
            Phone
            <input
                onChange={(e) => {
                    setPhn(e.target.value)
                }}
                // value={password}
                className="inputs"  /> <br /> <br />
            <button
                // onClick={handleSubmit}
                className="btns" onClick={() => {if(add === '' || phn === '')
                {
                    alert("Please don't leave any field empty!!");
                }
                else if(cart === [])
                {
                    alert("Cart is Empty");
                }
                else (placeOrder())}}> PLACE ORDER</button>
        </div>
        <Footer/>



        </>
    );
};

export default OrderCart;