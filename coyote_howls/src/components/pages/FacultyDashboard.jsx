import React from "react";
import "./FacultyDashboard.css";
/* importing each component from their appropriate locations */

const FacultyDashboard = () => {
  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>
      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          <li>Meeting Created: Oct 27 2024 with Jane Doe</li>
          <li>Meeting Modified: Oct 29 2024 with Peter Parker</li>
          <li>Meeting Cancelled: October 23 2024 Tony Stark</li>

        </ul>
      </div>
      <div className="left_column">
        <div className="fd_modify_appt">
          <button className="fd_modify_appt">Modify Appointment</button>
        </div>
        <div className="fd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list"> 10/27 12:00 pm - Doe 
              <button className="edit_button">Edit</button>
            </li>
            <li className="up_comming_appt_list"> 10/29 1:00pm - Parker
              <button className="edit_button"> Edit </button>
            </li>

          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li className="body_navbar">
              <button href="#Courses" className="button" onClick="course_view()">
                History
              </button>
            </li>
            <li className="body_navbar">
              <button href="#History" className="button" onClick="history_view()">
                Availability
              </button>
            </li>
          </ul>
        </div>
        
        <hr className="line" /> 

        <div className="fd_body">
          <table hidden className=".history_table" >
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>01/02/24</td>
              <td>Student 1</td>
              <td>Help with Homework</td>
              <td>Canceled</td>
            </tr>
            <tr>
              <td>01/02/24</td>
              <td>Student 2</td>
              <td>Discuss Current Grade</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>01/01/24</td>
              <td>Student 3</td>
              <td>Missing Lecture</td>
              <td>Rescheduled</td>
            </tr>
            <tr>
              <td>12/18/23</td>
              <td>Student 4</td>
              <td>Discuss Exam Score</td>
              <td>Completed</td>
            </tr>
          </table>
          
          <div class= "grid_container">
            <div className="item item-1">Edit Availability</div>
            <div className="item item-2">From</div>
            <div className="item item-3">Until</div>
            <div className="item item-4 time_slot dropdown">9:00a
              <div className="dropdown-content">
                <p>9:30</p>
                <p>10:00</p>
                <p>10:30</p>
                <p>11:00</p>
                <p>11:30</p>
                <p>12:00</p>
                <p>12:30</p>
                <p>1:00</p>
                <p>1:30</p>
              </div>
            </div>
            <div className="item item-5 time_slot dropdown">9:00a
              <div className="dropdown-content">
                <p>9:30</p>
                <p>10:00</p>
                <p>10:30</p>
                <p>11:00</p>
                <p>11:30</p>
                <p>12:00</p>
                <p>12:30</p>
                <p>1:00</p>
                <p>1:30</p>
              </div>
            </div>
          <div className="item item-6">Apply To</div>
          <div className="item item-7">
            <label class="container"> Only This Day
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label>
            <label class="container"> Every Monday
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label>
            <label class="container"> Everyday
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label> 
          </div>
          <div className="item item-10 "><button className="add_availability">Add Availiability</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FacultyDashboard;
