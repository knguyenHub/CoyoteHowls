import React from 'react'
import "./About.css";  // importing css file
import logoFinal from "../../assets/logo-final-draft.png"  // importing image from assests


const About = () => {
  return (
    <div className='about_background_color'>
      {/* About Header */ }
      <div className='about_header'>
        <h1>About Us</h1>
        
      </div>
          {/* Body of the page */ }
        <div className='about_body'> 
          {/* left side with image */ }
          <div className='about_left'>
            <h3>Our Story</h3>
            <p>
            Coyote Howls is a convenient office hours scheduling website for professors and students offers a streamlined way to manage appointments and ensure better communication. This platform allows students to easily view available time slots, book appointments, and receive reminders, reducing the hassle of coordinating meetings. Professors benefit from an organized schedule that automatically adjusts to their availability, minimizing double-booking and time conflicts.
            </p>
          </div>
          {/* right side with text */ }
          <div className='about_right'>
            <img src={logoFinal} alt="image of two guys looking at a laptop" className='logo_final' />  
          </div>
        </div>

    </div>
  )
}

export default About


