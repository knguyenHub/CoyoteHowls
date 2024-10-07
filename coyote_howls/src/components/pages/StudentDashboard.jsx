import React from "react";
import "./StudentDashboard.css";
/* importing each component from their appropriate locations */

const StudentDashboard = () => {
  return (
    <div className="sd_background_color">
      <div className="sd_header">
        <h1>Student Home</h1>
      </div>
      <div className="left_column">
          <button className="sd_schedule_appt">Schedule Appointment</button>
        <div className="sd_upcoming_appt">
        <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list li"> 10/27 12:00 pm - Jin 
              <button className="edit_button">Edit</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li>
              <button href="#Courses" className="button" onClick="course_view()">
                Courses
              </button>
            </li>
            <li>
              <button href="#History" className="button" onClick="history_view()">
                History
              </button>
            </li>
          </ul>
        </div>
        
        <hr className="line" /> 

        <div className="sd_body">
        <table hidden className=".course_table" >
            <tr>
              <th>Course</th>
              <th>Professor</th>
              <th>Professor Email</th>
              <th>Availablity</th>
            </tr>
            <tr>
              <td>Course 1</td>
              <td>Prof 1</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
            <tr>
              <td>Course 2</td>
              <td>Prof 2</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
            <tr>
              <td>Course 3</td>
              <td>Prof 3</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
            <tr>
              <td>Course 4</td>
              <td>Prof 4</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
            <tr>
              <td>Course 5</td>
              <td>Prof 5</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
            <tr>
              <td>Course 6</td>
              <td>Prof 6</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
          </table>

          <table className=".history_table" >
            <tr>
              <th>Date</th>
              <th>Professor</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>01/02/24</td>
              <td>Professor 1</td>
              <td>Help with Homework</td>
              <td>Canceled</td>
            </tr>
            <tr>
              <td>01/02/24</td>
              <td>Professor 2</td>
              <td>Discuss Current Grade</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>01/01/24</td>
              <td>Professor 3</td>
              <td>Missing Lecture</td>
              <td>Rescheduled</td>
            </tr>
            <tr>
              <td>12/18/23</td>
              <td>Profesor 1</td>
              <td>@csusb.edu</td>
              <td>Time</td>
            </tr>
          
          </table>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
