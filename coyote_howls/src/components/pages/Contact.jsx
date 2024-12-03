import React from 'react'
import "./Contact.css";                                             // importing css file 
import email_png from "../../assets/email_icon.png"                 // importing icon image of email from assets
import phone_png from "../../assets/phone_icon.png"                 // importing icon image of phone from assets
import location_png from "../../assets/location_icon.png"           // importing icon image of location form assests

const Contact = () => {
  return (
    <div className = "contact_background">
    <div className='contact_header'>                {/* header */}
      <h1>Contact CSUSB</h1>
    </div> 
      <div className = "contact_main">
        <div className='contact_body'>                                       {/* body text for each section: email, phone, location*/ }
          <div className='contact_column'>                                   {/* column with location info */ }
            <div>
              <a href="https://www.csusb.edu/campus-directory" target="_blank" rel="noopener noreferrer">
              <h3>Campus Directory</h3>
              </a>
              <p>
                Phone numbers, extensions, building locations and email addresses of
                specific faculty, departments and staff.
              </p> 

              <a href="https://www.csusb.edu/admissions" target="_blank" rel="noopener noreferrer">
              <h3> Admissons</h3>
              </a>
              <p> 
                Office: University Hall - 107 <br />
                Phone:(909) 537-5188
              </p>

              <a href="https://www.csusb.edu/registrar" target="_blank" rel="noopener noreferrer">
              <h3>Registration</h3>
              </a>
              <p>
                Office: University Hall - 171 <br />
                Phone: (909)537-7671 <br />
                Email: <a href="mailto:registrationhelp@csusb.edu"> registrationhelp@csusb.edu </a>
              </p>
            </div>

          </div>

          <div className='contact_column'>                                    {/* column with phone info */ }
            <div>
              <a href="https://www.csusb.edu/registrar/records/request-csusb-transcript" target="_blank" rel="noopener noreferrer">
              <h3> Transcripts </h3>
              </a>
              <p>
                Office: University Hall - 171 <br />
                Phone: (909)537-5200 Option 3 <br />
                Email: <a href="mailto:transxhelp@csusb.edu">  transxhelp@csusb.edu </a>
              </p>  

              <a href="https://www.csusb.edu/financial-aid" target="_blank" rel="noopener noreferrer">
              <h3> Financial Aid and Scholarships</h3>
              </a>
              <p>
                Office: Univeristy Hall - 150 <br/>
                Phone: (909)537-5227
              </p>

              <a href="https://www.csusb.edu/parking" target="_blank" rel="noopener noreferrer">
              <h3> Parking & Transportation</h3>
              </a>
              <p>
                Office: University Hall - 039 <br/>
                Phone: (909) 537-5912 <br/>
                Email: <a href="mailto:parking@csusb.edu"> parking@csusb.edu </a>
              </p>
            </div>

          </div>

          <div className='contact_column2'>                                     {/* column with email info */ }
            <div className='contact_item'>
            <img src={phone_png} alt="" className='icon' /> 
            <div className='text_item'>
              <h3>Phone</h3>
              <p>
                +1 (909) 537-5000
              </p>           {/* phone icon */ }
            </div>
            </div>
            <div className='contact_item'>
            <img src={location_png} alt="" className='icon' /> 
            <div className='text_item'>
              <h3>Office Address</h3>
              <p>
                5500 University Pkwy, San Bernadino, CA 92407
              </p>   {/* location icon */ }
            </div> 
            </div> 
            <div className='contact_item'>
              <img src={email_png} alt="" className='icon' />
              <div className='text_item'>
              <h3> Email </h3>
              <p>
                <a href="mailto:moreinfo@csusb.edu"> moreinfo.csusb.edu </a>
              </p>             {/* email icon */ }
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
