import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from 'react-bootstrap/Button';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { API_CLIENT } from "../shared/services/api-client";
import Grid from "@mui/material/Grid";
import Footer from './Footer';

export const PizzaCard = () => {
  const [pizza, setPizza] = useState([]);

   useEffect(() => {
    async function fetchProducts() {
      let promise =  await API_CLIENT.get(process.env.REACT_APP_PRODUCTS_URL);
      console.log("testtttt", promise);
    // promise = await promise.json();
    // console.log("##### "+ promise);
    if(promise)
    {
      if (promise.status === 200) {
        setPizza(promise.data.result);
        // alert('Found success.')
    } else {
        alert('Error.')
    }
    }
    
  }
  fetchProducts();
}, []);

  const createCard = (pizza) => {
    return (
      <Grid item xs={2}>
        <Card sx={{ maxWidth: 345 }}>{cardInternal(pizza)}</Card>
      </Grid>
    );
  };

  const cardInternal = (pizza) => {
    let cardStyle={
      display: "inline-block",
      top: "5vh",
      margin : "20px",
      width: "10rem",
  }
    return (
      <CardActionArea>
        
        <CardMedia Card style={cardStyle}
          component="img"
          height="140"
          margin= "20px"
           width= "18rem"
          image={pizza.image}
          alt={pizza.name}
        />
        
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="div">
            {pizza.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pizza.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pizza.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pizza.seller}
          </Typography>
        </CardContent>
      </CardActionArea>
    );
  };

  return (
    <>
    <div>
      <Grid
        container
        spacing={3}
        //height="140"
         // margin= "20px"
           width= "80rem"
        // justifyContent="center"
        
      >
        {pizza.map((pizza, index) => createCard(pizza))}
      </Grid>
      
    </div>
    </>
  );

};