import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../auth"; // Ensure auth.js is correctly imported

const FacultyModify = ({ userID }) => {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");

  const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
    const timeSlots = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    days.forEach((day) => {
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          const start = `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${
            hour < 12 ? "AM" : "PM"
          }`;
          const endHourAdj = minute + intervalMinutes >= 60 ? hour + 1 : hour;
          const endMinuteAdj = (minute + intervalMinutes) % 60;
          const end = `${endHourAdj % 12 || 12}:${endMinuteAdj
            .toString()
            .padStart(2, "0")} ${endHourAdj < 12 ? "AM" : "PM"}`;
          timeSlots.push(`${day} ${start} - ${end}`);
        }
      }
    });

    return timeSlots;
  };

  useEffect(() => {
    if (!userID) {
      console.error("User ID is missing. Please ensure it is passed as a prop.");
      alert("Error: User ID is missing.");
      return;
    }

    const fetchSchedule = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userID));
        if (userDoc.exists() && userDoc.data().schedule) {
          setScheduleData(userDoc.data().schedule);
        } else {
          console.warn("No existing schedule found. Generating default schedule.");
          const defaultSchedule = {};
          generateTimeSlots(9, 17, 30).forEach((slot) => {
            defaultSchedule[slot] = { location: "Room 301", comments: "" };
          });
          setScheduleData(defaultSchedule);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        alert("Failed to fetch the schedule. Please try again later.");
      }
    };

    fetchSchedule();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTime) {
      alert("Please select a time slot first.");
      return;
    }

    if (!userID) {
      alert("Error: User ID is missing.");
      return;
    }

    try {
      const updatedData = {
        ...scheduleData,
        [selectedTime]: { location, comments },
      };

      console.log("Updating Firestore with data:", updatedData);
      await updateDoc(doc(db, "users", userID), { schedule: updatedData });
      setScheduleData(updatedData);
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update the appointment. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Modify Appointments</h1>
      <form onSubmit={handleSubmit}>
        {/* Time Selection */}
        <div>
          <label>Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            {Object.keys(scheduleData).length > 0 ? (
              Object.keys(scheduleData).map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))
            ) : (
              <option disabled>No time slots available</option>
            )}
          </select>
        </div>

        {/* Location Selection */}
        <div>
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Room 301">Room 301</option>
            <option value="Zoom">Zoom</option>
          </select>
        </div>

        {/* Comments Input */}
        <div>
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter any additional comments or notes here."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default FacultyModify;
