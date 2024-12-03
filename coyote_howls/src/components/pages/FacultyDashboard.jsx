import "./FacultyDashboard.css";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
//import firebase attributes
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../../auth.js";
/* importing each component from their appropriate locations */

const FacultyDashboard = (userID) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate("/Faculty_Modify");
  };
  const handleEditClick = () => {
    navigate("/Faculty_Modify");
  };

  const [visibleSection, setVisibleSection] = useState("history"); // default visible is "history" when page is loaded

  // Handle the click to show the "Courses" section
  const showHistory = () => {
    setVisibleSection("history");
  };

  // Handle the click to show the "History" section
  const showAvailability = () => {
    setVisibleSection("availability");
  };

  const showEditAvailability = () => {
    setVisibleSection("editAvailability");
  };
  const getFirstMondayOfMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const offset = (7 - dayOfWeek + 1) % 7;
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + offset);
    return firstDayOfMonth;
  };
  /*Calendar Navigation*/
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentWeek, setCurrentWeek] = useState(
    getFirstMondayOfMonth(new Date())
  );

  const [availabilityData, setAvailabilityData] = useState({
    Monday: ["9:00 AM - 11:00 AM", "2:00 PM - 4:00 PM"],
    Tuesday: ["10:00 AM - 12:00 PM"],
    Wednesday: [],
    Thursday: ["1:00 PM - 3:00 PM"],
    Friday: ["3:00 PM - 5:00 PM"],
  });

  const [editingAvailability, setEditingAvailability] = useState({
    startTime: "",
    endTime: "",
    startTimePeriod: "am",
    endTimePeriod: "am",
    applyTo: "Only This Day",
  });

  // Function to change weeks
  const handleWeekChange = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));

    // Check if newDate is out of the current month bounds
    const newMonthIndex = newDate.getMonth();
    if (newMonthIndex !== currentMonthIndex) {
      //change the month and reset the week to the first Monday of the new month
      setCurrentMonthIndex(newMonthIndex);
      setCurrentWeek(getFirstMondayOfMonth(newDate));
    } else {
      setCurrentWeek(newDate);
    }
  };

  // Function to change months and reset week to the first Monday of the new month
  const handleMonthChange = (direction) => {
    const newMonthIndex =
      direction === "next" ? currentMonthIndex + 1 : currentMonthIndex - 1;
    setCurrentMonthIndex(newMonthIndex);

    // Get the first Monday of the new month
    const newMonthFirstMonday = getFirstMondayOfMonth(
      new Date(new Date().setMonth(newMonthIndex))
    );
    setCurrentWeek(newMonthFirstMonday);
  };

  //get the month name
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[(monthIndex + 12) % 12];
  };

  // get the current week range
  const getWeekRange = () => {
    const startOfWeek = new Date(currentWeek);
    const endOfWeek = new Date(currentWeek);

    // Adjust to Monday start
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);
    endOfWeek.setDate(startOfWeek.getDate() + 4);

    const formatDate = (date) =>
      `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;

    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  // Function to handle availability edit
  const handleEditAvailability = (day, timeSlot) => {
    const slot = timeSlot; // 

    setEditingAvailability({
      startTime: slot.startTime, 
      endTime: slot.endTime,
      startTimePeriod: slot.startTimePeriod || "am", 
      endTimePeriod: slot.endTimePeriod || "am", 
      applyTo: slot.applyTo || "Only This Day", 
    });
  };
  const handleFormChange = (e) => {
    setEditingAvailability({
      ...editingAvailability,
      [e.target.name]: e.target.value,
    });
  };

  // Function to save edited availability 
  const saveEditedAvailability = () => {
    if (
      !editingAvailability ||
      !editingAvailability.day ||
      !editingAvailability.timeSlot
    ) {
      console.error("Editing availability data is incomplete");
      return;
    }

    if (!availabilityData[editingAvailability.day]) {
      console.error(
        `No availability data found for ${editingAvailability.day}`
      );
      return;
    }

    const updatedAvailability = { ...availabilityData };

    // Update the time slot
    updatedAvailability[editingAvailability.day] = updatedAvailability[
      editingAvailability.day
    ].map((timeSlot) => {
      if (timeSlot === editingAvailability.timeSlot) {
        return `${editingAvailability.startTime} - ${editingAvailability.endTime}`;
      }
      return timeSlot;
    });

    // Set the updated availability data 
    setAvailabilityData(updatedAvailability);
    setEditingAvailability(null);
  };

  //Edit Availability test bttn
  const confirm_availability = () => {
    /* select drop down */
    var s_hrs = document.getElementById("s_hr");
    var s_mins = document.getElementById("s_min");
    var e_hrs = document.getElementById("e_hr");
    var e_mins = document.getElementById("e_min");

    /*Apply to */
    var rad1 = document.getElementById("rad1");
    var rad2 = document.getElementById("rad2");
    var rad3 = document.getElementById("rad3");

    /*am & pm*/
    var start_am = document.getElementById("s_am");
    var start_pm = document.getElementById("s_pm");
    var end_am = document.getElementById("e_am");
    var end_pm = document.getElementById("e_pm");

    /* test am/pm buttons */
    /* From */
    if (start_am.checked == true)
      alert("The selected element is " + start_am.value);
    else if (start_pm.checked == true)
      alert("The selected element is " + start_pm.value);
    /*Toggle*/

    /* Until */
    if (end_am.checked == true)
      alert("The selected element is " + end_am.value);
    else if (end_pm.checked == true)
      alert("The selected element is " + end_pm.value);

    /* testing apply to button(s): replace with submit to form */
    if (rad1.checked == true) alert("The selected element is " + rad1.value);
    else if (rad2.checked == true)
      alert("The selected element is " + rad2.value);
    else if (rad3.checked == true)
      alert("The selected element is " + rad3.value);
  };

  /* Notification Header Functions */
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const meetingsRef = collection(db, "meetings");
        const meetingsQuery = query(
          meetingsRef,
          where("participants", "array-contains", userID),
          orderBy("date", "desc"),
          limit(4)
        );
        const meetingsSnapshot = await getDocs(meetingsQuery);
        const meetings = meetingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const formattedNotifications = await Promise.all(
          meetings.map(async (meeting) => {
            const studentId = meeting.participants.find((id) => id !== userID);
            const studentDoc = await getDoc(doc(db, "users", studentId));
            const studentName = studentDoc.exists()
              ? studentDoc.data().name
              : "Unknown";
            const dateFormat = new Date(meeting.date).toLocaleDataString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );
            return "Meeting ${meeting.action}: ${dateFormat} with Student ${studentName}";
          })
        );
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };
    fetchNotifications();
  }, [userID]);

  /* Faculty History Fxns */
  /* Fxn for history of appointments (4 most recent)*/
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const meetingsRef = collection(db, "meetings");
        const meetingQuery = query(
          meetingsRef,
          where("participants", "array-contains", userID),
          orderBy("date", "desc"),
          limit(4)
        );

        const meetingSnapshot = await getDocs(meetingQuery);
        const meetings = meetingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const enrichedMeetings = await Promise.all(
          meetings.map(async (meeting) => {
            const professorID = meeting.participants.find(
              (id) => id !== userID
            );
            const professorDoc = await getDoc(doc(db, "users", professorID));
            return {
              date: meeting.date,
              professorName: professorDoc.exists()
                ? professorDoc.data().name
                : "Unknown",
              notes: meeting.notes,
              action: meeting.action,
            };
          })
        );

        setHistory(enrichedMeetings);
      } catch (error) {
        console.error("Error fetching meeting history: ", error);
      }
    };

    fetchHistory();
  }, [userID]);

  /* Faculty Availabity Fxns */
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const userDocRef = doc(db, "users", user.userID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === "Faculty") {
          setAvailability(userDoc.data().availability || {});
        } else {
          console.error(
            "ERROR: User is not a faculty or has no availability data."
          );
        }
      } catch (error) {
        console.error("Error fetching availability: ", error);
      }
    };
    fetchAvailability;
  }, [userID]);

  /* !!!!!!! HTML !!!!!! */
  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>
      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          {/* new notif bar
           {notifications.map((message, index) => (
            <li key={index}>{message}</li>
           ))}
           */}
          <li>Meeting Created: Oct 27 2024 with Carolinne Marquez</li>
          <li>Meeting Modified: Oct 29 2024 with Karen Nguyen</li>
          <li>Meeting Cancelled: October 23 2024 Daniel Gaeta</li>
        </ul>
      </div>
      <div className="left_column">
        <div className="fd_modify_appt">
          <button className="fd_modify_appt" onClick={handleModifyClick}>
            Modify Appointment
          </button>
        </div>
        <div className="fd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list">
              {" "}
              10/27 12:00 pm - Marquez
              <button className="edit_button" onClick={handleEditClick}>
                Edit
              </button>
            </li>
            <li className="up_comming_appt_list">
              {" "}
              10/29 1:00pm - Nguyen
              <button className="edit_button" onClick={handleEditClick}>
                {" "}
                Edit{" "}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li className="body_navbar">
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
            <li className="body_navbar">
              <button
                href="#Availability"
                className={`button availability-btn ${
                  visibleSection === "availability" ? "active" : ""
                }`}
                onClick={showAvailability}
              >
                Availability
              </button>
            </li>
          </ul>
        </div>

        <hr className="line" />

        <div className="fd_body">
          {visibleSection === "history" && (
            <table className="history_table">
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
              {history.map((entry, index) => {
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.professorName}</td>
                  <td>{entry.notes}</td>
                  <td>{entry.action}</td>
                </tr>;
              })}
              <tr>
                <td>10/23/24</td>
                <td>Daniel Gaeta</td>
                <td>Help with Homework</td>
                <td>Canceled</td>
              </tr>
              <tr>
                <td>09/12/24</td>
                <td>Joaquin Ramos</td>
                <td>Discuss Current Grade</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>09/03/24</td>
                <td>Aaliyah McCollum</td>
                <td>Missing Lecture</td>
                <td>Rescheduled</td>
              </tr>
              <tr>
                <td>08/29/24</td>
                <td>Anthony Craddock</td>
                <td>Discuss Exam Score</td>
                <td>Completed</td>
              </tr>
            </table>
          )}

          {visibleSection === "editAvailability" && (
            <div className="grid_container">
              <div className="item item-1">Edit Availability</div>
              <div className="item item-2">
                <u>From</u>
              </div>
              <div className="item item-3">
                <u>Until</u>
              </div>
              <div className="item start_hours time_slot dropdown">
                <select
                  name="startTime"
                  id="s_hr"
                  value={editingAvailability.startTime || ""}
                  onChange={handleFormChange}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="colon1"> : </div>
              <div className="dropdown start_mins">
                <select
                  name="startMin"
                  id="s_min"
                  value={editingAvailability.startMin || ""}
                  onChange={handleFormChange}
                >
                  {[
                    "00",
                    "05",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                  ].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </div>
              <div className="times stime">
                <label className="container item">
                  am
                  <input
                    type="radio"
                    name="startTimePeriod"
                    value="am"
                    checked={editingAvailability.startTimePeriod === "am"}
                    onChange={handleFormChange}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container item">
                  pm
                  <input
                    type="radio"
                    name="startTimePeriod"
                    value="pm"
                    checked={editingAvailability.startTimePeriod === "pm"}
                    onChange={handleFormChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="item end_hours time_slot dropdown">
                <select
                  name="endTime"
                  id="e_hr"
                  value={editingAvailability.endTime || ""}
                  onChange={handleFormChange}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="colon2"> : </div>
              <div className="dropdown end_mins">
                <select
                  name="endMin"
                  id="e_min"
                  value={editingAvailability.endMin || ""}
                  onChange={handleFormChange}
                >
                  {[
                    "00",
                    "05",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                  ].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </div>
              <div className="times etime">
                <label className="container item">
                  am
                  <input
                    type="radio"
                    name="endTimePeriod"
                    value="am"
                    checked={editingAvailability.endTimePeriod === "am"}
                    onChange={handleFormChange}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container item">
                  pm
                  <input
                    type="radio"
                    name="endTimePeriod"
                    value="pm"
                    checked={editingAvailability.endTimePeriod === "pm"}
                    onChange={handleFormChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="item item-6">
                <u>Apply To</u>
              </div>
              <label className="container item item-7">
                Only This Day
                <input
                  type="radio"
                  name="applyTo"
                  value="Only This Day"
                  checked={editingAvailability.applyTo === "Only This Day"}
                  onChange={handleFormChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container item item-8">
                Every Monday
                <input
                  type="radio"
                  name="applyTo"
                  value="Every Monday"
                  checked={editingAvailability.applyTo === "Every Monday"}
                  onChange={handleFormChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container item item-9">
                Everyday
                <input
                  type="radio"
                  name="applyTo"
                  value="Everyday"
                  checked={editingAvailability.applyTo === "Everyday"}
                  onChange={handleFormChange}
                />
                <span className="checkmark"></span>
              </label>
              <div className="item item-10">
                <button
                  onClick={saveEditedAvailability}
                  className="add_availability"
                  id="add_availability"
                  type="submit"
                >
                  Add Availability
                </button>
              </div>
            </div>
          )}

          {/* Calendar Section */}

          {visibleSection === "availability" && (
            <div className="calendarr">
              <div className="f-calendar-header">
                <button
                  className="prev"
                  onClick={() => handleMonthChange("prev")}
                >
                  {"<"}{" "}
                  -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <span className="f-month">
                  {getMonthName(currentMonthIndex)}
                </span>
                <button
                  className="next"
                  onClick={() => handleMonthChange("next")}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{" "}
                  {">"}
                </button>
              </div>

              <div className="f_week-header">
                <button
                  className="prev-week"
                  onClick={() => handleWeekChange("prev")}
                >
                  {"<"}{" "}
                  -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <span>{getWeekRange()}</span>
                <button
                  className="next-week"
                  onClick={() => handleWeekChange("next")}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{" "}
                  {">"}
                </button>
              </div>

              <div className="f_week-days">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day) => (
                    <div className="day_header" key={day}>
                      <div className="f_day">{day}</div>
                      <div className="f_time">
                        <ul>
                          {availabilityData[day] &&
                          availabilityData[day].length > 0 ? (
                            availabilityData[day].map((timeSlot, index) => (
                              <li key={index}>
                                <button
                                  onClick={() =>
                                    handleEditAvailability(day, timeSlot)
                                  }
                                  className="calendar_times"
                                >
                                  {timeSlot}
                                </button>
                              </li>
                            ))
                          ) : (
                            <li>
                              <button className="calendar_times">
                                Unavailable
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {visibleSection === "availability" && (
            <button
              href="#EditAvailability"
              className={`button editAvailability-btn ${
                visibleSection === "editAvailability" ? "active" : ""
              }`}
              onClick={showEditAvailability}
            >
              Edit Availability
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default FacultyDashboard;
