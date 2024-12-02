import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate("/student_meeting");
  };

  const handleDeleteClick = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId }),
      });

      if (response.ok) {
        alert("Appointment deleted successfully");
        fetchHistoryData(); // Refresh the history data
      } else {
        alert("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const [visibleSection, setVisibleSection] = useState("courses");
  const [historyData, setHistoryData] = useState([]); // State to store fetched data

  const fetchHistoryData = async () => {
    try {
      const response = await fetch("http://localhost:3001/appointments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHistoryData(data); // Assuming the backend returns an array of appointments
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const showCourses = () => {
    setVisibleSection("courses");
  };

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
        <button className="sd_schedule_appt" onClick={handleScheduleClick}>
          Schedule Appointment
        </button>
        <div className="sd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            {historyData
              .filter((appointment) => appointment.status === "pending")
              .map((appointment, index) => (
                <li key={index} className="upcoming_appt_list li">
                  {new Date(appointment.requestTime).toLocaleDateString()} - {appointment.facultyId}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li>
              <button
                href="#Courses"
                className={`button courses-btn ${
                  visibleSection === "courses" ? "active" : ""
                }`}
                onClick={showCourses}
              >
                Courses
              </button>
            </li>
            <li>
              <button
                href="#History"
                className={`button history-btn ${
                  visibleSection === "history" ? "active" : ""
                }`}
                onClick={showHistory}
              >
                History
              </button>
            </li>
          </ul>
        </div>

        <hr className="line" />

        <div className="sd_body">
          {visibleSection === "courses" && (
            <table className=".course_table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Professor</th>
                  <th>Professor Email</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          )}

          {visibleSection === "history" && (
            <table className=".history_table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Professor</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length > 0 ? (
                  historyData.map((appointment, index) => (
                    <tr key={index}>
                      <td>{new Date(appointment.requestTime).toLocaleDateString()}</td>
                      <td>{appointment.facultyId}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button onClick={() => handleDeleteClick(appointment.appointmentId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No appointments available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
