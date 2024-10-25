import React, { useState } from "react"; // Importing React and useState hook
import "./Student_Meeting.css"; // Importing CSS file for styling 


const Student_Meeting = () => {
  // State variables to hold input values for the 
  const [professor, setProfessor] = useState(""); // State for professor selection
  const [course, setCourse] = useState(""); // State for course selection
  const [location, setLocation] = useState(""); // State for location selection
  const [comments, setComments] = useState(""); // State for comments input

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Meeting Scheduled:", { professor, course, location, comments }); // Log meeting details to console
  };

  return (

    <div className="sh_header"> {/* main header of website */}
      <h1> Student Home </h1>
      
    <div className="sd_container"> {/* Main container for the student home page */}
      <div className="sm">  {/* heading for the main container */}
        <h2>Schedule Meeting</h2> 
      </div>

      {/* Main container for the schedule form and calendar */}
      <div className="schedule-container">   
        <div className="schedule-meeting">   {/* Schedule Meeting section */}
          <form onSubmit={handleSubmit} className="meeting-form"> {/* Form for scheduling a meeting */}
            <div className="form-group">  {/* Form group for Professor selection */}
              <label>Professor:</label> {/* Label for the professor dropdown */}
              <select value={professor} onChange={(e) => setProfessor(e.target.value)}>
                <option value="">Select Professor</option> {/* Default option */}
                <option value="Prof. Jin">Prof. Jin</option> {/* input for professor */}
                <option value="Prof. Jen">Prof. Jen</option> {/* input for professor */}
              </select>
            </div>

            <div className="form-group">  {/* Form group for Course selection */}
              <label>Course:</label> {/* label for the course dropdown */}
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">Select Course</option> {/* default option */}
                <option value="CSE 5001">CSE 5001</option> {/* input for course */}
                <option value="CSE 5002">CSE 5002</option> {/* input for course */}
              </select>
            </div>

            <div className="form-group">  {/* Form group for Location selection */}
              <label>Location:</label> {/* label for the location dropdown */}
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select Location</option> {/* display for location button */}
                <option value="Room 301">Room 301</option> {/* input for location option */}
                <option value="ZOOM">ZOOM</option> {/* input for location option */}
              </select>
            </div>

            <div className="form-group">  {/* Form group for Comments input */}
              <label>Comments:</label> {/* label for comments textarea */}
              <textarea
                value={comments}   /* bind textarea to comments state */ 
                onChange={(e) => setComments(e.target.value)}   /* update comments state on change */ 
                placeholder="Add comments here"  /* Placeholder text for textarea */ 
              />
            </div>

            <button className="submit"type="submit">Confirm</button> {/* Button to submit the form */}
          </form>
        </div>

        {/* Calendar Section */}
        <div className="calendar">
          <div className="calendar-header">  {/* Header for the month navigation */}
            <button className="prev">{"<"}-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button> {/* Button to navigate to previous month with &nbsp; for non-breaking spaces */}
            <span className="month">September</span> {/* display current month */}
            <button className="next">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{">"}</button> {/* Button to navigate to next month with &nbsp; for non-breaking spaces  */}
          </div>
          {/* Header for week navigation */}
          <div className="week-header">
            <button className="prev-week">{"<"}-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button> {/* Button to navigate to previous week with &nbsp; for non-breaking spaces */}
            <span> Sep 23 - Sep 27 </span> {/* Display current week range */}
            <button className="next-week">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{">"}</button> {/* Button to navigate to next week with &nbsp; for non-breaking spaces */}
          </div>
          {/* Days of the week */}
          <div className="week-days">
          { /* displays Monday header with "time" for the container that follows under */}
            <div className="day_header">
              <div className="day">Monday</div>  
              <div className="time">
              </div>
            </div> 
            { /* displays Tuesday header with "time" for the container that follows under */}
            <div className="day_header">
              <div className="day">Tuesday</div>
              <div className="time">
              </div>
            </div> 
            { /* displays Wednesday header with "time" for the container that follows under */}
            <div className="day_header">
              <div className="day"> Wednesday</div>
              <div className="time">
              </div>
            </div> 
            { /* displays Thursday header with "time" for the container that follows under */}
            <div className="day_header">
              <div className="day"> Thursday</div>
              <div className="time">
              </div>
            </div> 
            { /* displays Friday header with "time" for the container that follows under */}
            <div className="day_header">
              <div className="day">Friday</div>
              <div className="time">
              </div>
              </div> 
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Student_Meeting; // exports the component
