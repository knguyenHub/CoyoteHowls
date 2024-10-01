import React from 'react'
import "./Contact.css";
import email_png from "../../assets/email_icon.png"
import phone_png from "../../assets/phone_icon.png"
import location_png from "../../assets/location_icon.png"

const Contact = () => {
  return (
    <div className = "contact_background">

    

    <div className='contact_header'>
      <h1>Contact Us</h1>
    </div> 
      <div className = "contact_main">
      

        <div className='contact_body'>

          <div className='contact_column'>
            <div>
              <img src={location_png} alt="" className='location_png' />  
            </div>
            <h3>Office Address</h3>
            <p>
              5500 University Pkwy, San Bernadino, CA 92407
            </p>
          </div>

          <div className='contact_column'>
            <div>
              <img src={phone_png} alt="" className='phone_png' />  
            </div>
            <h3> Phone </h3>
            <p>
              +1 (909) 537-5000
            </p>
          </div>

          <div className='contact_column'>
            <div>
              <img src={email_png} alt="" className='email_png' /> 
            </div>
            <h3> Email </h3>
            <p>
              moreinfo.csusb.edu
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
