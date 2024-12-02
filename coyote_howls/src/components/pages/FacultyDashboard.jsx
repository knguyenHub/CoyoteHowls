import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    { id: "101", slotId: "1", studentName: "John Doe", studentId: "12345", time: "10:00 AM", status: "pending" },
    { id: "102", slotId: "2", studentName: "Jane Smith", studentId: "67890", time: "11:00 AM", status: "approved" },
    { id: "103", slotId: "3", studentName: "Alice Johnson", studentId: "11223", time: "1:00 PM", status: "rejected" },
  ]);

  const [availability, setAvailability] = useState([
    { slotId: "1", startTime: "2024-12-03T10:00:00", endTime: "2024-12-03T12:00:00", status: "available" },
    { slotId: "2", startTime: "2024-12-04T14:00:00", endTime: "2024-12-04T16:00:00", status: "available" },
    { slotId: "3", startTime: "2024-12-05T09:00:00", endTime: "2024-12-05T11:00:00", status: "unavailable" },
  ]);

  const [visibleSection, setVisibleSection] = useState("history");

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const handleModifyClick = () => {
    navigate("/Faculty_Modify");
  };

  const handleDeleteClick = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
    alert(`Appointment ${appointmentId} deleted successfully!`);
  };

  const approveAllPending = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.status === "pending" ? { ...appointment, status: "approved" } : appointment
    );
    setAppointments(updatedAppointments);
    alert("All pending appointments have been approved.");
  };

  const rejectAllPending = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.status === "pending" ? { ...appointment, status: "rejected" } : appointment
    );
    setAppointments(updatedAppointments);
    alert("All pending appointments have been rejected.");
  };

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>

      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          <li>Meeting Created: Dec 01 2024 with John Doe</li>
          <li>Meeting Modified: Dec 02 2024 with Jane Smith</li>
          <li>Meeting Cancelled: Dec 03 2024 with Alice Johnson</li>
        </ul>
      </div>

      <div className="fd_left_column">
        <div className="fd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <button onClick={approveAllPending}>Approve All Pending</button>
            <button onClick={rejectAllPending}>Reject All Pending</button>
            <b>Upcoming Appointments</b>
            {appointments.length > 0 ? (
              appointments
                .filter((appointment) => appointment.status === "pending")
                .map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.time} - {appointment.studentName} (ID: {appointment.studentId})
                    <button onClick={() => handleDeleteClick(appointment.id)}>Delete</button>
                  </li>
                ))
            ) : (
              <li>No upcoming appointments.</li>
            )}
          </ul>
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
