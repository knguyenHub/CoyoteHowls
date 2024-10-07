import React from 'react'
import "./Contact.css";                                             // importing css file 
import email_png from "../../assets/email_icon.png"                 // importing icon image of email from assets
import phone_png from "../../assets/phone_icon.png"                 // importing icon image of phone from assets
import location_png from "../../assets/location_icon.png"           // importing icon image of location form assests

const Contact = () => {
  return (
    <div className = "contact_background">
    <div className='contact_header'>                {/* header */}
      <h1>Contact Us</h1>
    </div> 
      <div className = "contact_main">
        <div className='contact_body'>                                       {/* body text for each section: email, phone, location*/ }
          <div className='contact_column'>                                   {/* column with location info */ }
            <div>
              <img src={location_png} alt="" className='location_png' />     {/* location icon */ }
            </div>
            <h3>Office Address</h3>
            <p>
              5500 University Pkwy, San Bernadino, CA 92407
            </p>
          </div>

          <div className='contact_column'>                                    {/* column with phone info */ }
            <div>
              <img src={phone_png} alt="" className='phone_png' />            {/* phone icon */ }
            </div>
            <h3> Phone </h3>
            <p>
              +1 (909) 537-5000
            </p>
          </div>

          <div className='contact_column'>                                     {/* column with email info */ }
            <div>
              <img src={email_png} alt="" className='email_png' />             {/* email icon */ }
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
