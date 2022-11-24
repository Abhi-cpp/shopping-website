import React from 'react'
import { useEffect, useState } from "react";

import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";


export default function Update(productObj) {
  const [load, setLoad] = useState(true);



    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('TOKEN')
        if (!token) {
            navigate('/')
        }
    }, [])
    
    const [name, setName] = useState(productObj.productObj.shoe.name)
    const [price, setPrice] = useState(productObj.productObj.shoe.price)
    const [category, setCategory] = useState(productObj.productObj.shoe.category)
    const [seller, setSeller] = useState(productObj.productObj.shoe.seller)
    const [description, setDescription] = useState(productObj.productObj.shoe.description)
    const [quantity, setQuantity] = useState(productObj.productObj.shoe.quantity)
    const [image, setImage] = useState(productObj.productObj.shoe.image)
   
  
    const handleSubmit = () => {
        // console.log(name, seller)
        // productObj.name = name;
        // productObj.price = price;
        // productObj.category = category;
        // productObj.seller = seller;
        // productObj.description = description;
        // productObj.quantity = quantity;
        // productObj.image = image;
        const testObj = {
            name,
            price,
            category,
            seller,
            description,
            quantity,
            image,
            "_id" : productObj.productObj.shoe._id

       }
        axios.post(process.env.REACT_APP_UPDATE_PRODUCT_URL,
            testObj)
            .then(res => {
                // console.log(res.data)

                if (res.status === 400) {
                    alert('User Not Found')
                }
               
                else if (res.status === 200) {
                    // move to home
                    alert("Product Updated Successfully")
                    navigate('/admin')
                    localStorage.setItem('TOKEN', res.data.token)
                    localStorage.setItem('EMAIL', res.data.email)
                }
            }).catch(err => {
                console.log(err)
            })
    }
  return (
    <>
        <h1 className="center"> Update Page</h1>
        <div className="outcard">
            Name
            <input
                onChange={(e) => {
                    setName(e.target.value)
                }}
                value={name}
                className="inputs"
                type="email" /> <br /> <br />
            Image
            <input
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                value={image}
                className="inputs" type="inputs" /> <br /> <br />
                 Price
            <input
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                value={price}
                className="inputs" type="inputs" /> <br /> <br />
                 Description
            <input
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                value={description}
                className="inputs" type="inputs" /> <br /> <br />
                 Category
            <input
                onChange={(e) => {
                    setCategory(e.target.value)
                }}
                value={category}
                className="inputs" type="inputs" /> <br /> <br />
                 Quantity
            <input
                onChange={(e) => {
                    setQuantity(e.target.value)
                }}
                value={quantity}
                className="inputs" type="inputs" /> <br /> <br />
                 Seller
            <input
                onChange={(e) => {
                    setSeller(e.target.value)
                }}
                value={seller}
                className="inputs" type="inputs" /> <br /> <br />
               
            <button
                onClick={() => {if(name === '' || image === '' || price === '' || description === '' || category === ''|| quantity === ''|| seller === '')
                {
                    alert("Please don't leave any field empty!!");
                }
                else (handleSubmit())}}
                className="btns"> UPDATE </button>
            
          
        </div>
    </>
    )
  
}
