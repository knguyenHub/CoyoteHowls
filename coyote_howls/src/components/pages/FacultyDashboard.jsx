import "./FacultyDashboard.css";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const FacultyDashboard = ({ userID }) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate("/Faculty_Modify");
  };

  const handleDeleteClick = async (appointmentId) => {
    console.log("Deleting appointment with ID:", appointmentId); // Debugging log
    if (!appointmentId) {
      alert("Invalid Appointment ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Appointment deleted successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete appointment: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred while deleting the appointment.");
    }
  };

  const [visibleSection, setVisibleSection] = useState("history"); // default visible is "history" when page is loaded

  const showHistory = () => {
    setVisibleSection("history");
  };

  const showAvailability = () => {
    setVisibleSection("availability");
  };

  const showEditAvailability = () => {
    setVisibleSection("editAvailability");
  };

  /* Appointments Section */
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments/");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>
      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          <li>Meeting Created: Oct 27 2024 with Carolinne Marquez</li>
          <li>Meeting Modified: Oct 29 2024 with Karen Nguyen</li>
          <li>Meeting Cancelled: October 23 2024 with Daniel Gaeta</li>
        </ul>
      </div>

      <div className="left_column">
        

        <div className="fd_upcoming_appt">
          <ul className="up_comming_appt_list">
            
            <button onClick={() => {
              const updatedAppointments = appointments.map((appointment) =>
                appointment.status === 'pending' ? { ...appointment, status: 'approved' } : appointment
              );
              setAppointments(updatedAppointments);
              alert('All pending appointments have been approved.');
            }}>Approve All Pending</button>
            <button onClick={() => {
              const updatedAppointments = appointments.map((appointment) =>
                appointment.status === 'pending' ? { ...appointment, status: 'rejected' } : appointment
              );
              setAppointments(updatedAppointments);
              alert('All pending appointments have been rejected.');
            }}>Reject All Pending</button>
            
            <b>Upcoming Appointments</b>
            {appointments.length > 0 ? (
              appointments.filter(appointment => appointment.status === 'pending').map((appointment) => (
                <li className="upcoming_appt_list" key={appointment.id}>
                  {appointment.slotId} {appointment.time} - {appointment.studentName} (ID: {appointment.studentId})
                </li>
              ))
            ) : (
              <li>No upcoming appointments.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li className="body_navbar">
              <button
                href="#History"
                className={`button history-btn ${visibleSection === "history" ? "active" : ""}`}
                onClick={showHistory}
              >
                History
              </button>
            </li>
            <li className="body_navbar">
              <button
                href="#Availability"
                className={`button availability-btn ${visibleSection === "availability" ? "active" : ""}`}
                onClick={showAvailability}
              >
                Availability
              </button>
            </li>
          </ul>
        </div>

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
                  appointments.map((appointment, index) => (
                    <tr key={index}>
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
            <ul className="availability_list">
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <li key={index}>{appointment.slotId}: {appointment.time}</li>
                ))
              ) : (
                <li>No availability set.</li>
              )}
            </ul>
          </div>
        )}

        {visibleSection === "editAvailability" && (
          <div className="edit_availability_section">
            <h2>Edit Availability</h2>
            <form className="edit_availability_form">
              <label>
                Day:
                <input type="text" name="day" placeholder="Enter day" />
              </label>
              <label>
                Time:
                <input type="text" name="time" placeholder="Enter time slot" />
              </label>
              <button type="submit">Save Availability</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
