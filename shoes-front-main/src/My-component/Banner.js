import React from "react";
import Banner1 from './../assets/images/banner1.jpg';
import Banner2 from './../assets/images/banner2.jpg';
import Banner3 from './../assets/images/banner3.jpg';
import Banner4 from './../assets/images/banner4.jpg';
import {PizzaCard} from './Card';


const Banner=()=>{
    let Bannerstyle={
        Position : "absolute",
        top :"2vh",
    }
  return( <>
 
   <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={Bannerstyle}>
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={Banner1} className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src={Banner2} class="d-block w-100" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">
      <img src={Banner3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">
      <img src={Banner4} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </>
  );
}

export default Banner;