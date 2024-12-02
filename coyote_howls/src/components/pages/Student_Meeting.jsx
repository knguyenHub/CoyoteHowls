import React, { useState } from "react";
import "./Student_Meeting.css";

const Student_Meeting = () => {
  const [professor, setProfessor] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");
  const [studentId, setStudentId] = useState("");
  const [slotId, setSlotId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      studentId,
      facultyId: professor, // Send professor as facultyId
      slotId,
      status: "pending",
      comments,
      requestTime: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        alert("Appointment created successfully!");

        // Reset form inputs
        setProfessor("");
        setCourse("");
        setLocation("");
        setComments("");
        setStudentId("");
        setSlotId("");
      } else {
        alert("Failed to create appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sh_header">
      <h1>Student Home</h1>

      <div className="sd_container">
        <div className="sm">
          <h2>Schedule Meeting</h2>
        </div>

        <div className="schedule-container">
          <div className="schedule-meeting">
            <form onSubmit={handleSubmit} className="meeting-form">
              <div className="form-group">
                <label>Student ID:</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your Student ID"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slot ID:</label>
                <input
                  type="text"
                  value={slotId}
                  onChange={(e) => setSlotId(e.target.value)}
                  placeholder="Enter Slot ID"
                  required
                />
              </div>

              <div className="form-group">
                <label>Professor:</label>
                <select
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  required
                >
                  <option value="">Select Professor</option>
                  <option value="Arianne Schulz">Prof. Jin</option>
                  <option value="Bilal Khan">Bilal Khan</option>
                </select>
              </div>

              <div className="form-group">
                <label>Course:</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="CSE 5001">CSE 5001</option>
                  <option value="CSE 5002">CSE 5002</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location:</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Room 301">Room 301</option>
                  <option value="ZOOM">ZOOM</option>
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

              <button className="submit" type="submit">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Meeting;
