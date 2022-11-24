import React from 'react'
import { useEffect, useState } from "react";

import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from "@mui/material/CircularProgress";



export default function Seller() {
  const [load, setLoad] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    if (!token) {
        navigate('/')
    }
}, [])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [seller, setSeller] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
   
  
    const handleSubmit = () => { 
        // setLoad(true);
        axios.post(process.env.REACT_APP_PRODUCTS_ADD_URL,
            {
                 name,
                 price,
                 category,
                 seller,
                 description,
                 quantity,
                 image,

            })
            .then(res => {
                console.log(res.data)

                if (res.status === 400) {
                    
                    alert('User Not Found')
                    // setLoad(false);
                }
               
                else if (res.status === 200) {
                    // move to home
                    alert("Product added successfully")
                    navigate('/admin')
                    localStorage.setItem('TOKEN', res.data.token)
                    localStorage.setItem('EMAIL', res.data.email)
                }
            }).catch(err => {
        // setLoad(false);

                console.log(err)
            })
    }
  return (
    <>
        <h1 className="center"> Seller Page</h1>
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
                 {/* Category */}
            {/* <input
                onChange={(e) => {
                    setCategory(e.target.value)
                }}
                value={category}
                className="inputs" type="inputs" />  */}
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="inputs" type="inputs" 
          label="Age"
          onChange={(e) => {
            setCategory(e.target.value)
        }}
        >
          <MenuItem value="men">men</MenuItem>
          <MenuItem value="women">women</MenuItem>
          <MenuItem value="kid">kid</MenuItem>
        </Select>
      </FormControl>
                <br /> <br />
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
                {load ? (
            <CircularProgress className="redirecting" />
          ) :<button
          onClick={() => {if(name === '' || image === '' || price === '' || description === '' || category === ''|| quantity === ''|| seller === '')
          {
              alert("Please don't leave any field empty!!");
          }
          else (handleSubmit())}}
          className="btns"> SUBMIT </button>}
               
            {/* <button
                onClick={() => {if(name === '' || image === '' || price === '' || description === '' || category === ''|| quantity === ''|| seller === '')
                {
                    alert("Please don't leave any field empty!!");
                }
                else (handleSubmit())}}
                className="btns"> SUBMIT </button> */}
            
          
        </div>
    </>
    )
  
}
