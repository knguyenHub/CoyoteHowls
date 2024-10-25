import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; 
/* importing each component from their appropriate locations */

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => { // redirects to student meeting page
    navigate("/student_meeting"); 
  };
  const handleEditClick = () => {     // redirects to faculty modify
    navigate("/Faculty_Modify");      
  };
  

  const [visibleSection, setVisibleSection] = useState("courses");  // default visible is "courses" when page is loaded
  
  // Handle the click to show the "Courses" section
  const showCourses = () => {
    setVisibleSection("courses"); 
  };

  // Handle the click to show the "History" section
  const showHistory = () => {
    setVisibleSection("history");
  }; 

  
  return (
    <div className="sd_background_color">
      <div className="sd_header">
        <h1>Student Home</h1>
      </div>
      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          <li>Meeting Created: Oct 27 2024 with Professor Jin</li>
          <li>Meeting Modified: Oct 29 2024 with Professor Jin</li>
          <li>Meeting Cancelled: October 23 2024 by Professor Khan</li>
        </ul>
      </div>
      <div className="left_column">
          <button className="sd_schedule_appt" onClick={handleScheduleClick}>Schedule Appointment</button>
        <div className="sd_upcoming_appt">
        <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list li"> 10/27 12:00 pm - Jin 
              <button className="edit_button" onClick={handleEditClick}>Edit</button> 
            </li>
            <li className="upcoming_appt_list li"> 10/29 12:30 pm - Jin 
              <button className="edit_button" onClick={handleEditClick}>Edit</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li>
              <button href="#Courses" className={`button courses-btn ${visibleSection === "courses" ? "active" : ""}`} onClick={showCourses}>
                Courses
              </button>
            </li>
            <li>
              <button href="#History" className={`button history-btn ${visibleSection === "history" ? "active" : ""}`} onClick={showHistory}>
                History
              </button>
            </li>
          </ul>
        </div>
        
        <hr className="line" /> 

        <div className="sd_body">
          { visibleSection === "courses" && (
            <table className=".course_table" >

            <tr>
              <th>Course</th>
              <th>Professor</th>
              <th>Professor Email</th>
              <th>Availablity</th>
            </tr>
            <tr>
              <td>CSE 4600</td>
              <td>Bilal Khan</td>
              <td>bilal.khan@csusb.edu</td>
              <td>M/W 12:00p-1:00p</td>
            </tr>
            <tr>
              <td>ANTH 3500</td>
              <td>Arianne Schulz</td>
              <td>arianne.schulz@csusb.edu</td>
              <td>By Appointment</td>
            </tr>
            <tr>
              <td>CSE 4550</td>
              <td>Jennifer Jin</td>
              <td>jennifer.jin@csusb.edu</td>
              <td>Tues 11:45a-1:45p</td>
            </tr>
            <tr>
              <td>CSE 5000</td>
              <td>Nazanin Ghasemian</td>
              <td>nazanin.ghasemian@csusb.edu</td>
              <td>By Appointment</td>
            </tr>
            <tr>
              <td>CSE 5700</td>
              <td>Qiuxiao Chen</td>
              <td>qiuxiao.chen@csusb.edu</td>
              <td>M 2:30-3:30p</td>
            </tr>
          </table>
            
          )}
        
          { visibleSection === "history" && (
                      <table className=".history_table" >
                      <tr>
                        <th>Date</th>
                        <th>Professor</th>
                        <th>Notes</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td>10/02/24</td>
                        <td>Jennifer Jin</td>
                        <td>Help with Homework</td>
                        <td>Canceled</td>
                      </tr>
                      <tr>
                        <td>10/02/24</td>
                        <td>Bhilal Khan</td>
                        <td>Discuss Current Grade</td>
                        <td>Completed</td>
                      </tr>
                      <tr>
                        <td>09/10/24</td>
                        <td>Qiuxiao Chen</td>
                        <td>Missing Lecture</td>
                        <td>Rescheduled</td>
                      </tr>
                      <tr>
                        <td>08/28/24</td>
                        <td>Qiuxiao Chen</td>
                        <td>Syllabus Questions</td>
                        <td>Completed</td>
                      </tr>
                    
                    </table>
            
          )}

        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
