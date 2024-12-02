import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [visibleSection, setVisibleSection] = useState("history");
  const [newAvailability, setNewAvailability] = useState({
    facultyId: "123", // Replace with dynamic faculty ID
    status: "available",
    startTime: "",
    endTime: "",
  });

  // Fetch Appointments and Availability Slots
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments/");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchAvailability = async () => {
      try {
        const response = await fetch("http://localhost:3001/availability/");
        const data = await response.json();
        setAvailability(data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAppointments();
    fetchAvailability();
  }, []);

  // Handle Add Availability
  const handleAddAvailability = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAvailability),
      });
      const data = await response.json();

      if (response.ok) {
        setAvailability((prev) => [...prev, { slotId: data.slotId, ...newAvailability }]);
        alert("Availability added successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  // Handle Delete Availability
  const handleDeleteAvailability = async (slotId) => {
    try {
      const response = await fetch("http://localhost:3001/availability", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });

      if (response.ok) {
        setAvailability((prev) => prev.filter((slot) => slot.slotId !== slotId));
        alert("Availability deleted successfully!");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete availability: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };

  // Update New Availability Form
  const handleNewAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>

      <div className="right_column">
        <div>
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
        </div>

        <hr className="line" />

        {visibleSection === "history" && (
          <div className="history_section">
            <h2>Appointment History</h2>
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index}>
                  {appointment.slotId}: {appointment.status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === "availability" && (
          <div className="availability_section">
            <h2>Current Availability</h2>
            <ul>
              {availability.map((slot) => (
                <li key={slot.slotId}>
                  {slot.startTime} - {slot.endTime} ({slot.status})
                  <button onClick={() => handleDeleteAvailability(slot.slotId)}>Delete</button>
                </li>
              ))}
            </ul>

            <h3>Add Availability</h3>
            <form onSubmit={handleAddAvailability}>
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  name="startTime"
                  value={newAvailability.startTime}
                  onChange={handleNewAvailabilityChange}
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="datetime-local"
                  name="endTime"
                  value={newAvailability.endTime}
                  onChange={handleNewAvailabilityChange}
                  required
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={newAvailability.status}
                  onChange={handleNewAvailabilityChange}
                  required
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </label>
              <button type="submit">Add Slot</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
