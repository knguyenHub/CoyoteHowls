import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([
    { slotId: "1", startTime: "2024-12-03T10:00:00", endTime: "2024-12-03T12:00:00", status: "available" },
    { slotId: "2", startTime: "2024-12-04T14:00:00", endTime: "2024-12-04T16:00:00", status: "available" },
    { slotId: "3", startTime: "2024-12-05T09:00:00", endTime: "2024-12-05T11:00:00", status: "unavailable" },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      action: "Meeting Created",
      time: "Dec 01 2024",
      studentId: "12345",
      facultyId: "99999",
      requestTime: "10:00 AM",
    },
    {
      id: "2",
      action: "Meeting Modified",
      time: "Dec 02 2024",
      studentId: "67890",
      facultyId: "88888",
      requestTime: "11:30 AM",
    },
    {
      id: "3",
      action: "Meeting Cancelled",
      time: "Dec 03 2024",
      studentId: "11223",
      facultyId: "77777",
      requestTime: "12:00 PM",
    },
  ]);
  const [visibleSection, setVisibleSection] = useState("history");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments. Please try again.");
    }
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>

      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.action}: {notification.time} <br />
              Request Time: {notification.requestTime}, Student ID: {notification.studentId}, Faculty ID: {notification.facultyId}
            </li>
          ))}
        </ul>
      </div>

      <div className="fd_left_column">
        <div className="fd_upcoming_appt">
          <b>Upcoming Appointments</b>
          {appointments.length > 0 ? (
            <ul className="up_comming_appt_list">
              {appointments
                .filter((appointment) => appointment.status === "pending")
                .map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.time} - {appointment.studentName} (ID: {appointment.studentId})
                  </li>
                ))}
            </ul>
          ) : (
            <p>No pending appointments.</p>
          )}
        </div>
      </div>

      <div className="fd_right_column">
        <ul className="body_navbar">
          <li>
            <button
              className={`button history-btn ${visibleSection === "history" ? "active" : ""}`}
              onClick={() => setVisibleSection("history")}
            >
              History
            </button>
          </li>
          <li>
            <button
              className={`button availability-btn ${visibleSection === "availability" ? "active" : ""}`}
              onClick={() => setVisibleSection("availability")}
            >
              Availability
            </button>
          </li>
        </ul>

        <hr className="line" />

        {visibleSection === "history" && (
          <div className="history_section">
            <h2>Appointment History</h2>
            <table className="history_table">
              <thead>
                <tr>
                  <th>Slot ID</th>
                  <th>Status</th>
                  <th>Student ID</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.slotId}</td>
                      <td>{appointment.status}</td>
                      <td>{appointment.studentId}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No appointment history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {visibleSection === "availability" && (
          <div className="availability_section">
            <h2>Current Availability</h2>
            <table className="availability_table">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((slot) => (
                  <tr key={slot.slotId}>
                    <td>{formatTime(slot.startTime)}</td>
                    <td>{formatTime(slot.endTime)}</td>
                    <td>{slot.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
