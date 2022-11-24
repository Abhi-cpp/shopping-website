import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from 'react-router-dom';


import { API_CLIENT } from "../shared/services/api-client";
import CircularProgress from '@mui/material/CircularProgress';
import Header from "./Header";
import Footer from "./Footer";
import '../App.css';
function Kid() {
  const [cart, setCart] = useState([]);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate()

    

  const addToCart = (data) =>{

    
    async function add() {
     const token = localStorage.getItem('TOKEN');

     const response = await API_CLIENT.post(process.env.REACT_APP_ADD_CART_URL, {
       headers :{
           'Authorization': `Bearer ${token}`
       },
       data : {
         "product" : {
           "_id" : data._id
       },
       "quantity" : "1"
       }
   })
   .then(res =>{
     alert(res.data.message)
   }).catch(err => alert("Already in cart"))
 
   
     window.location.reload()
     
   }
   add();

}


  let cardStyle = {
    display: "inline-block",
    top: "5vh",
    margin: "20px",
    width: "18rem",
  };

  const [shoe, setShoe] = useState([]);
  useEffect(() => {
    async function fetchProducts() {

      const token = localStorage.getItem('TOKEN')
      if (!token) {
          navigate('/')
      }

      const category = {
        cat : "kid"
      }

      const promise =  await API_CLIENT.post(process.env.REACT_APP_CATEGORY_PRODUCT_URL, category);
      // console.log("Back ",promise.data.result);
      if(promise){
        // console.log("back#### ",promise.data.result);
          setShoe(promise.data.result);
          setLoad(false);

          // console.log(shoe);
      }
      else{
        console.log("Network error");
      }
      // promise
      //   .then((result) => {
      //     console.log("front#### ",result);
      //     setShoe(result.data.result);
      //   })
      //   .catch((err) => console.log("Network error"));
      }

      fetchProducts();
    }, []);

  const createCard = (shoe) =>{
    return (
      <Card style={cardStyle}>{cardInternal(shoe)}</Card>
    )
  }
  const cardInternal = (shoe) =>{
    return(

    <><Card.Img variant="top" src={shoe.image} /><Card.Body>
      <Card.Title>{shoe.name}</Card.Title>
      <Card.Text>
      {shoe.description}
      </Card.Text>
      <Card.Text>
      {shoe.price}
      </Card.Text>
      <Button onClick={() => addToCart(shoe)} variant="primary">Add To Cart</Button>
    </Card.Body></>
    )
  }
 
  return (
    <>
      <Header />
      <div className="container p-1 ">
        <h1 className="text-center Men-style">KIDS COLLECTIONS</h1>
        <hr></hr>
        {load  ? <CircularProgress className="redirecting"/> :shoe.map((shoe,index) => createCard(shoe))}
      </div>
      {/* <Footer/> */}
    </>
  );
}
export default Kid;
