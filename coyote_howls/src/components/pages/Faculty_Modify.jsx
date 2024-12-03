import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Faculty_Modify.css";

const FacultyModify = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments/");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }
        const data = await response.json();
        console.log("Fetched appointments:", data); // Debugging fetched data
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentChange = (appointmentId) => {
    const appointment = appointments.find(appt => appt.appointmentId === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setLocation(appointment.location || "");
      setStatus(appointment.status);
      setComments(appointment.comments || "");
    }
  };

  const handleRouteToEdit = (appointmentId) => {
    navigate(`/edit/${appointmentId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAppointment) {
      const updatedAppointment = {
        appointmentId: selectedAppointment.appointmentId,
        studentName: selectedAppointment.studentName,
        course: selectedAppointment.course,
        day: selectedAppointment.day,
        time: selectedAppointment.time,
        location,
        status,
        comments,
      };

      console.log("Updated Appointment Payload:", updatedAppointment); // Debugging payload

      try {
        const response = await fetch(`http://localhost:3001/appointments/${selectedAppointment.appointmentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointment),
        });

        if (!response.ok) {
          throw new Error("Failed to update appointment.");
        }

        setAppointments((prev) =>
          prev.map((appt) =>
            appt.appointmentId === updatedAppointment.appointmentId
              ? updatedAppointment
              : appt
          )
        );

        alert("Appointment updated successfully!");
      } catch (error) {
        console.error("Error updating appointment:", error);
        alert("Failed to update appointment. Please try again.");
      }
    } else {
      alert("Please select an appointment first.");
    }
  };

  return (
    <div className="FacultyModify">
      <h1>Faculty Modify Appointments</h1>

      <div className="form-group">
        <label>Select Appointment:</label>
        <select
          onChange={(e) => handleAppointmentChange(e.target.value)}
          value={selectedAppointment?.appointmentId || ""}
        >
          <option value="" disabled>Select an appointment</option>
          {appointments.map((appointment) => (
            <option key={appointment.appointmentId} value={appointment.appointmentId}>
              {`${appointment.studentName || "Unknown Student"} - ${appointment.course || "Unknown Course"} (${appointment.day || "Unknown Day"} ${appointment.time || "Unknown Time"})`}
            </option>
          ))}
        </select>
      </div>

      <div className="route-group">
        <button
          onClick={() =>
            selectedAppointment && handleRouteToEdit(selectedAppointment.appointmentId)
          }
          disabled={!selectedAppointment}
        >
          Edit Appointment Details
        </button>
      </div>

      {selectedAppointment && (
        <form onSubmit={handleSubmit} className="appointment-form">
          <h2>Modify Appointment</h2>

          <div className="form-group">
            <label>Student:</label>
            <input type="text" value={selectedAppointment.studentName || "Unknown Student"} readOnly />
          </div>

          <div className="form-group">
            <label>Course:</label>
            <input type="text" value={selectedAppointment.course || "Unknown Course"} readOnly />
          </div>

          <div className="form-group">
            <label>Day:</label>
            <input type="text" value={selectedAppointment.day || "Unknown Day"} readOnly />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <input type="text" value={selectedAppointment.time || "Unknown Time"} readOnly />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select Location</option>
              <option value="Room 301">Room 301</option>
              <option value="ZOOM">ZOOM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add comments here"
            />
          </div>

          <button type="submit">Update Appointment</button>
        </form>
      )}
    </div>
  );
};

export default FacultyModify;
