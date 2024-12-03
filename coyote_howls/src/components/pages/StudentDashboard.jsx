import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import firebase attributes
import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import {db} from "../../auth.js"
import { async } from "@firebase/util";
/* importing each component from their appropriate locations */

const StudentDashboard = ({userID}) => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    // redirects to student meeting page
    navigate("/student_meeting");
  };
  const handleEditClick = () => {
    // redirects to faculty modify
    navigate("/student_meeting");
  };

  const [visibleSection, setVisibleSection] = useState("courses"); // default visible is "courses" when page is loaded

  // Handle the click to show the "Courses" section
  const showCourses = () => {
    setVisibleSection("courses");
  };

  // Handle the click to show the "History" section
  const showHistory = () => {
    setVisibleSection("history");
  };
  /* Notification Header Functions */
  const[notifications, setNotifications] = useState([]);
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
        const meetings = meetingsSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        
        const formattedNotifications = await Promise.all(
          meetings.map(async (meeting) => {
            const professorId = meeting.participants.find((id) => id !== userID);
            const professorDoc = await getDoc(doc (db, "users", professorId));
            const professorName = professorDoc.exists() ? professorDoc.data().name : "Unknown";
            const dateFormat = new Date(meeting.date).toLocaleDataString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return 'Meeting ${meeting.action}: ${dateFormat} with Professor ${professorName}';
          })
        );
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    }; fetchNotifications();
  }, [userID]);

  /* Function to display courses table w/ queries*/
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      const fetchCourses = async () => {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList = querySnapshot.docs.map((doc) => doc.data());
        setCourses(courseList);
      };

      fetchCourses();
  }, []); 

  /* Fxn for history of appointments (4 most recent)*/ 
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const meetingsRef = collection(db, "meetings");
        const meetingQuery = query(
          meetingsRef,
          where("participants" , "array-contains", userId),
          orderBy("date", "desc"),
          limit(4)
        );

        const meetingSnapshot = await getDocs(meetingQuery);
        const meetings = meetingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const enrichedMeetings = await Promise.all(
          meetings.map(async (meeting) => {
            const professorID = meeting.participants.find((id) => id !== userId);
            const professorDoc = await getDoc(doc(db, "users", professorID));
            return {
              date: meeting.date,
              professorName: professorDoc.exists() ? professorDoc.data().name: "Unknown",
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
        

  return (
    <div className="sd_background_color">
      <div className="sd_header">
        <h1>Student Home</h1>
      </div>
      <div className="fd_notification_header">
        <ul className="notifications">
          
          <b>Important Messages About Your Upcoming Meetings:</b>
          {/* new notif bar
           {notifications.map((message, index) => (
            <li key={index}>{message}</li>
           ))}
           */}
          <li>Meeting Created: Oct 27 2024 with Professor Jin</li>
          <li>Meeting Modified: Oct 29 2024 with Professor Jin</li>
          <li>Meeting Cancelled: October 23 2024 by Professor Khan</li>
        </ul>
      </div>
      <div className="left_column">
        <button className="sd_schedule_appt" onClick={handleScheduleClick}>
          Schedule Appointment
        </button>
        <div className="sd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list li">
              {" "}
              10/27 12:00 pm - Jin
              <button className="edit_button" onClick={handleEditClick}>
                Edit
              </button>
            </li>
            <li className="upcoming_appt_list li">
              {" "}
              10/29 12:30 pm - Jin
              <button className="edit_button" onClick={handleEditClick}>
                Edit
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="right_column">
        <div>
          <ul className="body_navbar">
            <li>
              <button
                href="#Courses"
                className={`button courses-btn ${
                  visibleSection === "courses" ? "active" : ""
                }`}
                onClick={showCourses}
              >
                Courses
              </button>
            </li>
            <li>
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
          </ul>
        </div>

        <hr className="line" />

        <div className="sd_body">
          {visibleSection === "courses" && (
            <table className=".course_table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Professor</th>
                  <th>Professor Email</th>
                  <th>Availablity</th>
                </tr>
              </thead>
              <tbody>
                {/*                 
                {courses.map((course, index) => (
                  <tr key = {index}>
                    <td> {course.courseID} </td>
                    <td> {course.courseProfessor}</td>
                    <td> {course.ProfEmail}</td>
                    <td> {course.ProfAvailability}</td>
                  </tr>
                ))}  */}
                <tr>
                  <td>CSE 4600</td>
                  <td>Bilal Khan</td>
                  <td>bilal.khan@csusb.edu</td>
                  <td>M/W 12:00p-1:00p</td>
                </tr>
                <tr>
                  <td>ANTH 3500</td>
                  <td>Arianne Schulz</td>
                  <td>arianne.schulz@csusb.edu</td>
                  <td>By Appointment</td>
                </tr>
                <tr>
                  <td>CSE 4550</td>
                  <td>Jennifer Jin</td>
                  <td>jennifer.jin@csusb.edu</td>
                  <td>Tues 11:45a-1:45p</td>
                </tr>
                <tr>
                  <td>CSE 5000</td>
                  <td>Nazanin Ghasemian</td>
                  <td>nazanin.ghasemian@csusb.edu</td>
                  <td>By Appointment</td>
                </tr>
                <tr>
                  <td>CSE 5700</td>
                  <td>Qiuxiao Chen</td>
                  <td>qiuxiao.chen@csusb.edu</td>
                  <td>M 2:30-3:30p</td>
                </tr>
              </tbody>
            </table>
          )}

          {visibleSection === "history" && (
            <table className=".history_table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Professor</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => {
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.professorName}</td>
                    <td>{entry.notes}</td>
                    <td>{entry.action}</td>
                  </tr>
                })}
              </tbody>
              <tr>
                <td>10/02/24</td>
                <td>Jennifer Jin</td>
                <td>Help with Homework</td>
                <td>Canceled</td>
              </tr>
              <tr>
                <td>10/02/24</td>
                <td>Bhilal Khan</td>
                <td>Discuss Current Grade</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>09/10/24</td>
                <td>Qiuxiao Chen</td>
                <td>Missing Lecture</td>
                <td>Rescheduled</td>
              </tr>
              <tr>
                <td>08/28/24</td>
                <td>Qiuxiao Chen</td>
                <td>Syllabus Questions</td>
                <td>Completed</td>
              </tr>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
