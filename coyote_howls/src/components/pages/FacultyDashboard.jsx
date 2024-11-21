import "./FacultyDashboard.css";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"; 
//import firebase attributes
import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import {db} from "../../auth.js"
/* importing each component from their appropriate locations */

const FacultyDashboard = ({userID}) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate("/Faculty_Modify"); 
  };
  const handleEditClick = () => {
    navigate("/Faculty_Modify"); 
  };
  
  const [visibleSection, setVisibleSection] = useState("history");  // default visible is "history" when page is loaded
  
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

  /* Notification Header Functions */
  const[notifications, setNotifications] = useState([]);

  useEffect(() => { 
    const fetchNotifications = async () => {
      try {
        const meetingsRef = collection(db, "meetings");
        const meetingsQuery = query(
          meetingsRef,
          where("participants", "array-contains", userId),
          orderBy("date", "desc"),
          limit(4)
        );
        const meetingsSnapshot = await getDocs(meetingsQuery);
        const meetings = meetingsSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        
        const formattedNotifications = await Promise.all(
          meetings.map(async (meeting) => {
            const studentId = meeting.participants.find((id) => id !== userId);
            const studentDoc = await getDoc(doc (db, "users", studentId));
            const studentName = studentDoc.exists() ? studentDoc.data().name : "Unknown";
            const dateFormat = new Date(meeting.date).toLocaleDataString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return 'Meeting ${meeting.action}: ${dateFormat} with Student ${studentName}';
          })
        );
      setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    }; fetchNotifications();
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

    /* Faculty Availabity Fxns */
    const [availability, setAvailability] = useState([]);
    
    useEffect(() => {
      const fetchAvailability = async () => {
        try {
          const userDocRef = doc(db, "users", user.userID);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role === "Faculty") {
            setAvailability(userDoc.data().availability || {}); 
          }
          else {
            console.error("ERROR: User is not a faculty or has no availability data.")
          }
          
        } catch(error) {
          console.error("Error fetching availability: ", error);
        }
        
        };  
        fetchAvailability;
      }, []);
    


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
          <button className="fd_modify_appt"onClick={handleModifyClick}>Modify Appointment</button>
        </div>
        <div className="fd_upcoming_appt">
          <ul className="up_comming_appt_list">
            <b>Upcoming Appointments</b>
            <li className="upcoming_appt_list">
              {" "}
              10/27 12:00 pm - Marquez
              <button className="edit_button" onClick={handleEditClick}>Edit</button>
            </li>
            <li className="up_comming_appt_list">
              {" "}
              10/29 1:00pm - Nguyen
              <button className="edit_button" onClick={handleEditClick}> Edit </button>
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
                className= {`button history-btn ${visibleSection === "history" ? "active" : ""}`}
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
                  </tr>
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
            <div className="item item-2">From</div>
            <div className="item item-3">Until</div>
            <div className="item item-4 time_slot dropdown">
              9:00a
              <div className="dropdown-content">
                <p>9:30</p>
                <p>10:00</p>
                <p>10:30</p>
                <p>11:00</p>
                <p>11:30</p>
                <p>12:00</p>
                <p>12:30</p>
                <p>1:00</p>
                <p>1:30</p>
              </div>
            </div>
            <div className="item item-5 time_slot dropdown">
              9:00a
              <div className="dropdown-content">
                <p>9:30</p>
                <p>10:00</p>
                <p>10:30</p>
                <p>11:00</p>
                <p>11:30</p>
                <p>12:00</p>
                <p>12:30</p>
                <p>1:00</p>
                <p>1:30</p>
              </div>
            </div>
            <div className="item item-6">Apply To</div>
            <label class="container item item-7">
              {" "}
              Only This Day
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label>
            <label class="container item item-8">
              {" "}
              Every Monday
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label>
            <label class="container item item-9">
              {" "}
              Everyday
              <input type="checkbox" checked="checked"></input>
              <span class="checkmark"></span>
            </label>
            <div className="item item-10 ">
              <button className="add_availability">Add Availiability</button>
            </div>
            </div>

          )}
          

            {/* Calendar Section */}

            {visibleSection === "availability" && (
              <div>
              <div>
              <div className="calendarr">
                <div className="f-calendar-header">
                  {" "}
                  {/* Header for the month navigation */}
                  <button className="prev">
                    {"<"}
                    -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>{" "}
                  {/* Button to navigate to previous month with &nbsp; for non-breaking spaces */}
                  <span className="f-month">September</span>{" "}
                  {/* display current month */}
                  <button className="next">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
                    {">"}
                  </button>{" "}
                  {/* Button to navigate to next month with &nbsp; for non-breaking spaces  */}
                </div>
                {/* Header for week navigation */}
                <div className="f_week-header">
                  <button className="prev-week">
                    {"<"}
                    -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>{" "}
                  {/* Button to navigate to previous week with &nbsp; for non-breaking spaces */}
                  <span> Sep 23 - Sep 27 </span>{" "}
                  {/* Display current week range */}
                  <button className="next-week">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
                    {">"}
                  </button>{" "}
                  {/* Button to navigate to next week with &nbsp; for non-breaking spaces */}
                </div>
                {/* Days of the week */}
                <div className="f_week-days">
                  {/* displays Monday header with "time" for the container that follows under */}
                  {/* {loading ? ( <p> Loading availability...</p>) : (
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <div className = "day_header" key={day}>
                        <div className="f_day">{day}</div>
                        <div className="f_time">
                          <ul> 
                            {availability[day] && availabilit[day].length > 0 ? (
                              availability[day].map((timeSlot, index) => <li key={index}>{timeSlot}</li>)
                            ) : ( 
                              <li> Unavailable </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))
                  )}
                  </div> */}
                  <div className="day_header">
                    <div className="f_day">Monday</div>
                    <div className="f_time">
                      <ul>

                      </ul>
                    </div>
                  </div>
                  {/* displays Tuesday header with "time" for the container that follows under */}
                  <div className="day_header">
                    <div className="f_day">Tuesday</div>
                    <div className="f_time">
                      
                    </div>
                  </div>
                  {/* displays Wednesday header with "time" for the container that follows under */}
                  <div className="day_header">
                    <div className="f_day"> Wednesday</div>
                    <div className="f_time"></div>
                  </div>
                  {/* displays Thursday header with "time" for the container that follows under */}
                  <div className="day_header">
                    <div className="f_day"> Thursday</div>
                    <div className="f_time"></div>
                  </div>
                  {/* displays Friday header with "time" for the container that follows under */}
                  <div className="day_header">
                    <div className="f_day">Friday</div>
                    <div className="f_time"></div>
                  </div>
                  
                </div>
              </div>
            </div>
            
            </div>
            )}
            {visibleSection === "availability" && (
              <button
              href='#EditAvailability' 
              className={`button editAvailability-btn ${visibleSection === "editAvailability" ? "active" : ""}`}
              onClick={showEditAvailability}>Edit Availability</button>
            )}
          </div>
          
        </div>
      </div>
    
  );
};
export default FacultyDashboard;
