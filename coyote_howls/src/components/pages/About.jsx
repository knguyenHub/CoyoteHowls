import React from 'react'
import "./About.css";  // importing css file
import about_png from "../../assets/about.png"  // importing image from assests


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
            <img src={about_png} alt="image of two guys looking at a laptop" className='about_img' />
          </div>
          {/* right side with text */ }
          <div className='about_right'>
            <p>
            Coyote Howls is a convenient office hours scheduling website for professors and students offers a streamlined way to manage appointments and ensure better communication. This platform allows students to easily view available time slots, book appointments, and receive reminders, reducing the hassle of coordinating meetings. Professors benefit from an organized schedule that automatically adjusts to their availability, minimizing double-booking and time conflicts.
            </p>
          </div>
        </div>

    </div>
  )
}

export default About


