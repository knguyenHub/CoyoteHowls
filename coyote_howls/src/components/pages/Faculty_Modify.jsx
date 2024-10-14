import React, { useState } from "react"; // Importing React and useState hook
import "./Faculty_Modify.css"; // Import CSS file for styling

const Faculty_Modify = () => {
    // State to manage the schedule data for different time slots (manually inputed for now)
  const [scheduleData, setScheduleData] = useState({
    "Monday-10:00am - 10:30am": { student: "Ka1", course: "CSE 5001", location: "Room 301", comments: "" },
    "Monday-2:00pm - 2:30pm": { student: "Ka2", course: "CSE 5002", location: "ZOOM", comments: "" },
    "Monday-4:00pm - 4:30pm": { student: "Ka3", course: "CSE 5003", location: "Room 301", comments: "" },
    "Tuesday-10:00am - 10:30am": { student: "Ali1", course: "CSE 5001", location: "Room 301", comments: "" },
    "Tuesday-2:00pm - 2:30pm": { student: "Ali2", course: "CSE 5002", location: "ZOOM", comments: "" },
    "Tuesday-4:00pm - 4:30pm": { student: "Ali3", course: "CSE 5003", location: "Room 301", comments: "" },
    "Wednesday-10:00am - 10:30am": { student: "Sa1", course: "CSE 5001", location: "Room 301", comments: "" },
    "Wednesday-2:00pm - 2:30pm": { student: "Sa2", course: "CSE 5002", location: "ZOOM", comments: "" },
    "Wednesday-4:00pm - 4:30pm": { student: "Sa3", course: "CSE 5003", location: "Room 301", comments: "" },
    "Thursday-10:00am - 10:30am": { student: "Yas1", course: "CSE 5001", location: "Room 301", comments: "" },
    "Thursday-2:00pm - 2:30pm": { student: "Yas2", course: "CSE 5002", location: "ZOOM", comments: "" },
    "Thursday-4:00pm - 4:30pm": { student: "Yas3", course: "CSE 5003", location: "Room 301", comments: "" },
    "Friday-10:00am - 10:30am": { student: "Ant1", course: "CSE 5001", location: "Room 301", comments: "" },
    "Friday-2:00pm - 2:30pm": { student: "Ant2", course: "CSE 5002", location: "ZOOM", comments: "" },
    "Friday-4:00pm - 4:30pm": { student: "Ant3", course: "CSE 5003", location: "Room 301", comments: "" },

  });

  // State variables to manage selected time slot and form input values
  const [selectedTime, setSelectedTime] = useState(""); // Track selected time slot
  const [location, setLocation] = useState(""); // state for location input
  const [comments, setComments] = useState(""); // state for comments input
  const [student, setStudent] = useState(""); // state for professor (read only)
  const [course, setCourse] = useState("");  // state for course (read only)

  // Handle clicking on a time slot to load its data into the form (this loads the infomation stored in the time slots)
  const handleTimeClick = (day, time) => {
    const key = `${day}-${time}`;  // creates a unique key for the selected day and time
    const data = scheduleData[key] || { student: "", course: "", location: "", comments: "" };  // gets the existing data (what is stored)

    // updates state with the selected time slots details
    setStudent(data.student);
    setCourse(data.course);
    setLocation(data.location);
    setComments(data.comments);
    setSelectedTime(key); // Store the selected time slot key
  };

  // Handle form submission to update schedule data
  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default form submission behavior
    if (selectedTime) {
      setScheduleData((prevData) => ({ 
        ...prevData,
        [selectedTime]: { student, course, location, comments }, // updates the selected time slot with form data
      }));
      alert(`Meeting scheduled for ${selectedTime} has been updated!`);  // confirmation alert that displays at the top of the screen
    } else {
      alert("Please select a time slot first."); // alert if user tries to delete/cancel but no time is selected
    }
  };

  // Handle cancel to clear the meeting and mark the time slot as canceled
  const handleCancel = () => {
    if (selectedTime) {
      setScheduleData((prevData) => ({
        ...prevData,
        [selectedTime]: { student: "", course: "", location: "", comments: "Canceled" },  // a default input for comments with "canceled" to indicate it's canceled
      }));
      // resets the form states
      setSelectedTime("");
      setStudent("");
      setCourse("");
      setLocation("");
      setComments("");
    } else {
      alert("Please select a time slot to cancel."); // alert if no time slot is selected
    }
  };

  // Function to check if a time slot is canceled
  const isCanceled = (day, time) => {
    const key = `${day}-${time}`;
    return scheduleData[key]?.comments === "Canceled";  // returns true if comments indicate cancellation 
  };

  // Function to check if a time slot is currently selected
  const isSelected = (day, time) => selectedTime === `${day}-${time}`; // return true if the time slot matches the selected time

  return (
    <div className="Fsh_header"> {/* main header of website */}
      <h1>Faculty Home</h1>

      <div className="Fsd_container"> {/* Main container for the student home page */}
        <div className="Fsm">  {/* heading for the main container */}
          <h2>Modify Appointments</h2>
        </div>

        {/* Main container for the schedule form and calendar */}
        <div className="Fschedule-container">
          {/* Schedule Meeting Form */}
          <div className="Fschedule-meeting">
            <form onSubmit={handleSubmit} className="Fmeeting-form">
              {/* Non-editable student Field */}
              <div className="Fform-group">
                <label>Student:</label> {/* label for the student */}
                <input type="text" value={student} readOnly />
              </div>

              {/* Non-editable Course Field */}
              <div className="Fform-group">
                <label>Course:</label>  {/* label for the course dropdown */}
                <input type="text" value={course} readOnly />
              </div>

              {/* Editable Location Field */}
              <div className="Fform-group">
                <label>Location:</label> {/* label for the location*/}
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Select Location</option> {/* display for location button */}
                  <option value="Room 301">Room 301</option> {/* input for location option */}
                  <option value="ZOOM">ZOOM</option> {/* input for location option */}
                </select>
              </div>

              {/* Non-editable Time Field */}
              <div className="Fform-group">
                <label>Time:</label>
                <input type="text" value={selectedTime.replace("-", " ")} readOnly />
              </div>

              {/* Editable Comments Field */}
              <div className="Fform-group">
                <label>Comments:</label>  {/* label for comments textarea */}
                <textarea
                  value={comments} /* bind textarea to comments state */ 
                  onChange={(e) => setComments(e.target.value)}   /* update comments state on change */ 
                  placeholder="Add comments here"  /* Placeholder text for textarea */ 
                />
              </div>

                {/* Buttons for confirming and canceling */}
              <div className="Fbutton-group">
                <button
                  type="button"
                  className="Fcancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="Fsubmit" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>

          {/* Calendar Section */}
          <div className="Fcalendar">
            <div className="Fcalendar-header"> {/* Header for the month navigation */}
              <button className="Fprev">{"<"}-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button> {/* Button to navigate to previous month with &nbsp; for non-breaking spaces */}
              <span className="Fmonth">September</span> {/* display current month */}
              <button className="Fnext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{">"}</button> {/* Button to navigate to next month with &nbsp; for non-breaking spaces  */}
            </div>

            {/* Header for week navigation */}
          <div className="Fweek-header">
            <button className="Fprev-week">{"<"}-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button> {/* Button to navigate to previous week with &nbsp; for non-breaking spaces */}
            <span> Sep 23 - Sep 27 </span> {/* Display current week range */}
            <button className="Fnext-week">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{">"}</button> {/* Button to navigate to next week with &nbsp; for non-breaking spaces */}
          </div>
             {/* Days of the week */}
            <div className="Fweek-days">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <div key={day} className="Fday_header">
                  <div className="Fday">{day}</div>
                  <div className="Ftime">
                    {/* Time Slots */}
                    {["10:00am - 10:30am", "2:00pm - 2:30pm", "4:00pm - 4:30pm"].map((time) => (
                      <div
                        key={`${day}-${time}`}
                        className={`Ftime-slot ${isCanceled(day, time) ? "canceled" : ""} ${
                          isSelected(day, time) ? "selected" : ""
                        }`}
                        onClick={() => handleTimeClick(day, time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty_Modify;
