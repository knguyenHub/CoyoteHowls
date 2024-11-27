import "./FacultyDashboard.css";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from "firebase/firestore";
import { db } from "../../auth.js";

const FacultyDashboard = ({ userID }) => {
  const navigate = useNavigate();

  const [visibleSection, setVisibleSection] = useState("history");
  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);
  const [courses, setCourses] = useState([]);
  const [availability, setAvailability] = useState([]);

  // Navigation Handlers
  const showHistory = () => setVisibleSection("history");
  const showCourses = () => setVisibleSection("courses");
  const showAvailability = () => setVisibleSection("availability");

  const handleModifyClick = () => navigate("/Faculty_Modify");

  // Fetch Notifications
  useEffect(() => {
    if (!userID) {
      console.error("User ID is missing. Cannot fetch notifications.");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userID));
        if (userDoc.exists()) {
          setNotifications(userDoc.data().notifications || []);
        } else {
          console.warn("No notifications found for the user.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userID]);

  // Fetch Meeting History
  useEffect(() => {
    if (!userID) {
      console.error("User ID is missing. Cannot fetch meeting history.");
      return;
    }

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
        const meetings = meetingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setHistory(meetings);
      } catch (error) {
        console.error("Error fetching meeting history:", error);
      }
    };

    fetchHistory();
  }, [userID]);

  // Fetch Courses
  useEffect(() => {
    if (!userID) {
      console.error("User ID is missing. Cannot fetch courses.");
      return;
    }

    const fetchCourses = async () => {
      try {
        const coursesRef = collection(db, "courses");
        const coursesQuery = query(coursesRef, where("faculty", "array-contains", userID));
        const coursesSnapshot = await getDocs(coursesQuery);
        const courseList = coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userID]);

  // Fetch Faculty Availability
  useEffect(() => {
    if (!userID) {
      console.error("User ID is missing. Cannot fetch availability.");
      return;
    }

    const fetchAvailability = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userID));
        if (userDoc.exists() && userDoc.data().role === "faculty") {
          setAvailability(userDoc.data().availability || []);
        } else {
          console.warn("No availability data found for the user.");
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [userID]);

  return (
    <div className="fd_background_color">
      <div className="fd_header">
        <h1>Faculty Home</h1>
      </div>

      {/* Notifications Section */}
      <div className="fd_notification_header">
        <ul className="notifications">
          <b>Important Messages About Your Upcoming Meetings:</b>
          {notifications.length > 0 ? (
            notifications.map((message, index) => <li key={index}>{message}</li>)
          ) : (
            <li>No notifications available</li>
          )}
        </ul>
      </div>

      {/* Left Column */}
      <div className="left_column">
        <button className="fd_modify_appt" onClick={handleModifyClick}>
          Modify Appointment
        </button>
      </div>

      {/* Right Column - Navigation */}
      <div className="right_column">
        <ul className="body_navbar">
          <li>
            <button
              className={`button history-btn ${visibleSection === "history" ? "active" : ""}`}
              onClick={showHistory}
            >
              History
            </button>
          </li>
          <li>
            <button
              className={`button courses-btn ${visibleSection === "courses" ? "active" : ""}`}
              onClick={showCourses}
            >
              Courses
            </button>
          </li>
          <li>
            <button
              className={`button availability-btn ${visibleSection === "availability" ? "active" : ""}`}
              onClick={showAvailability}
            >
              Availability
            </button>
          </li>
        </ul>

        <hr className="line" />

        {/* Sections */}
        <div className="fd_body">
          {visibleSection === "history" && (
            <div className="history_section">
              <h2>Meeting History</h2>
              <table className="history_table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((entry, index) => (
                      <tr key={index}>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.participants.find((p) => p !== userID)}</td>
                        <td>{entry.notes}</td>
                        <td>{entry.action}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No meeting history available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {visibleSection === "courses" && (
            <div className="courses_section">
              <h2>Courses</h2>
              <table className="courses_table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Enrolled Students</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.students.length}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No courses available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {visibleSection === "availability" && (
            <div className="availability_section">
              <h2>Availability</h2>
              <ul>
                {availability.length > 0 ? (
                  availability.map((slot, index) => <li key={index}>{slot}</li>)
                ) : (
                  <li>No availability set</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
