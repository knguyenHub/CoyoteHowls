import React from 'react'
import "./Home.css";
import {Slide} from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


import image1 from "../../assets/img1.png"
import image2 from "../../assets/img2.png"
import image3 from "../../assets/img3.png"
import image4 from "../../assets/img4.png"

const Home = () => {

  const slideImages = [image1, image2, image3, image4];

  return (
    
    <div>
      

      <div hidden className="successful_logout">
        Successfully Logged Out
      </div>
      
        <div className='homeheader'>
        <h1>Welcome to </h1>
        </div>
      

      <div className='slider_container'>
        <Slide
          duration={3000}
          transitionDuration={500}
          infinite={true}
          indicators={true}
          arrows={true}
          >
            {slideImages.map((image, index)=> (
              <div className='each-slide' key={index}>
                <img src={image} alt={"Slide ${index + 1}"} />
              </div>
            ))}
        </Slide>
      </div>
      {/*<img src="https://picsum.photos/400/300" alt="Random Image" hspace="50"/> */}
      <div className='homebottom'>
      <h1>Coyote Howls</h1>
      </div>
    </div>

  )
}

export default Home
