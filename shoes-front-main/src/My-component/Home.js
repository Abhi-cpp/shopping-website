import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Banner from './Banner';
import Footer from "./Footer";
import axios from "axios"
import Men from "./men";
import { API_CLIENT } from "../shared/services/api-client";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';






// import SiPuma from './Puma';

function Home() {
  const [load, setLoad] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem('TOKEN')
      if (!token) {
          navigate('/')
      }
  }, [])


    const [men, setMen] = useState([]);
  useEffect(() => {
    async function fetchProducts() {

      const category = {
        cat : "men"
      }

      const promise =  await API_CLIENT.post(process.env.REACT_APP_CATEGORY_LIMIT_URL, category);
      // console.log("Back ",promise.data.result);
      if(promise){
        // console.log("back#### ",promise.data.result);
          setMen(promise.data.result);
          setLoad(false);
          // console.log(shoe);
      }
      else{
        console.log("Network error");
      }
      }

      fetchProducts();
    }, []);


    const [women, setWomen] = useState([]);
  useEffect(() => {
    async function fetchProducts() {

      const category = {
        cat : "women"
      }

      const promise =  await API_CLIENT.post(process.env.REACT_APP_CATEGORY_LIMIT_URL, category);
      // console.log("Back ",promise.data.result);
      if(promise){
        // console.log("back#### ",promise.data.result);
          setWomen(promise.data.result);
          // console.log(shoe);
      }
      else{
        console.log("Network error");
      }
      }

      fetchProducts();
    }, []);

    const [kid, setKid] = useState([]);
  useEffect(() => {
    async function fetchProducts() {

      const category = {
        cat : "kid"
      }

      const promise =  await API_CLIENT.post(process.env.REACT_APP_CATEGORY_LIMIT_URL, category);
      // console.log("Back ",promise.data.result);
      if(promise){
        // console.log("back#### ",promise.data.result);
          setKid(promise.data.result);
          // console.log(shoe);
      }
      else{
        console.log("Network error");
      }
      }

      fetchProducts();
    }, []);

    let cardStyle = {
        display: "inline-block",
        top: "5vh",
        margin: "20px",
        width: "18rem",
      };


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
          
        </Card.Body></>
        )
      }

    return (
        <>
        <div>
           

<Header/>
{/* <SiPuma/> */}
<div className="container"><Banner/></div>

<div className="container">
<Link to="/men" className="show-btn" style={{ textDecoration: 'none' }}>Show All</Link>
<div className="mens">Mens Arena
</div>
{load ? <CircularProgress className="redirecting"/>:men.map((men,index) => createCard(men))} 
{/* {men.map((men,index) => createCard(men))} */}
</div>
<div className="container">
<Link to="/women" className="show-btn" style={{ textDecoration: 'none' }}>Show All</Link>
<div className="mens">Women's Top Charts</div>
{load ? <CircularProgress className="redirecting"/>:women.map((women,index) => createCard(women))} 
</div>
<div className="container">
<Link to="/kids" className="show-btn" style={{ textDecoration: 'none' }}>Show All</Link>
<div className="mens">Kid's Top Charts</div>
{load ? <CircularProgress className="redirecting"/>:kid.map((kid,index) => createCard(kid))} 
</div>




            


        </div>
        <Footer />
        </>
        
    )
}


export default Home