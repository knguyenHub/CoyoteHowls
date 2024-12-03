import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    facultyId: "12345",
    status: "available",
    startTime: "",
    endTime: "",
  });
  const [visibleSection, setVisibleSection] = useState("history");

  useEffect(() => {
    fetchAppointments();
    fetchAvailability();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await axios.get("http://localhost:3001/availability");
      setAvailabilitySlots(response.data);
    } catch (error) {
      console.error("Error fetching availability slots:", error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/appointments/${appointmentId}`
      );

      if (response.status === 200) {
        alert("Appointment deleted successfully!");
        // Remove the deleted appointment from the local state
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.appointmentId !== appointmentId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/appointments/${appointmentId}`,
        { status }
      );

      if (response.status === 200) {
        alert(`Appointment updated to ${status} successfully!`);
        // Update local state
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.appointmentId === appointmentId
              ? { ...appointment, status }
              : appointment
          )
        );
      }
    } catch (error) {
      console.error(`Error updating appointment ${appointmentId} to ${status}:`, error);
      alert(`Failed to update appointment to ${status}. Please try again.`);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const saveAvailability = async () => {
    const { facultyId, startTime, endTime } = newAvailability;
    if (!facultyId || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/availability", newAvailability);
      alert("Availability created successfully!");
      setShowOverlay(false);
      fetchAvailability();
    } catch (error) {
      console.error("Error creating availability:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Invalid Date";
    const date = new Date(dateTimeString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });
  };

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Dashboard</h1>
      </div>

      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.appointmentId}>
                Request Time: {formatDateTime(appointment.requestTime)} <br />
                Faculty ID: {appointment.facultyId}, Student ID:{" "}
                {appointment.studentId}
              </li>
            ))
          ) : (
            <p>No upcoming meetings.</p>
          )}
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
                  <li key={appointment.appointmentId}>
                    <div>
                      {formatDateTime(appointment.startTime)} -{" "}
                      {appointment.studentName} (ID: {appointment.studentId})
                    </div>
                    <div className="appointment_buttons">
                      <button
                        className="approve_button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.appointmentId,
                            "approved"
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject_button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.appointmentId,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
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
              className={`button history-btn ${
                visibleSection === "history" ? "active" : ""
              }`}
              onClick={() => setVisibleSection("history")}
            >
              History
            </button>
          </li>
          <li>
            <button
              className={`button availability-btn ${
                visibleSection === "availability" ? "active" : ""
              }`}
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
                  <th>Student ID</th>
                  <th>Status</th>
                  <th>Faculty ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.appointmentId}>
                      <td>{appointment.slotId}</td>
                      <td>{appointment.studentId}</td>
                      <td>{appointment.status}</td>
                      <td>{appointment.facultyId}</td>
                      <td>
                        <button
                          className="delete_button"
                          onClick={() =>
                            deleteAppointment(appointment.appointmentId)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No appointment history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {visibleSection === "availability" && (
          <div className="availability_section">
            <h2>Manage Availability</h2>
            <button className="add_button" onClick={() => setShowOverlay(true)}>
              Add Availability
            </button>
            <table className="availability_table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {availabilitySlots.length > 0 ? (
                  availabilitySlots.map((slot) => (
                    <tr key={slot.slotId}>
                      <td>{slot.status}</td>
                      <td>{formatDateTime(slot.startTime)}</td>
                      <td>{formatDateTime(slot.endTime)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No availability slots found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay_content">
            <h2>Create Availability</h2>
            <label>
              Status:
              <select
                name="status"
                value={newAvailability.status}
                onChange={handleFormChange}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </label>
            <label>
              Start Time:
              <input
                type="datetime-local"
                name="startTime"
                value={newAvailability.startTime}
                onChange={handleFormChange}
              />
            </label>
            <label>
              End Time:
              <input
                type="datetime-local"
                name="endTime"
                value={newAvailability.endTime}
                onChange={handleFormChange}
              />
            </label>
            <button className="save_button" onClick={saveAvailability}>
              Save
            </button>
            <button
              className="cancel_button"
              onClick={() => setShowOverlay(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
