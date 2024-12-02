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


  //Edit Availability 
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
            const studentId = meeting.participants.find((id) => id !== userID);
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
            where("participants" , "array-contains", userID),
            orderBy("date", "desc"),
            limit(4)
          );
  
          const meetingSnapshot = await getDocs(meetingQuery);
          const meetings = meetingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
          const enrichedMeetings = await Promise.all(
            meetings.map(async (meeting) => {
              const professorID = meeting.participants.find((id) => id !== userID);
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
              <div className="item item-2">
                <u>From</u>
              </div>
              <div className="item item-3">
                <u>Until</u>
              </div>
              <div className="item start_hours time_slot dropdown">
                <select name="s_hr" id="s_hr">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="colon1"> : </div>
              <div className="dropdown start_mins">
                <select name="s_min" id="s_min">
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
                <label class="container item">
                  {" "}
                  am
                  <input
                    type="radio"
                    name="start_time"
                    id="s_am"
                    value="am"
                  ></input>
                  <span class="checkmark"></span>
                </label>
                <label class="container item">
                  {" "}
                  pm
                  <input
                    type="radio"
                    name="start_time"
                    id="s_pm"
                    value="pm"
                  ></input>
                  <span class="checkmark"></span>
                </label>
              </div>

              <div className="item end_hours time_slot dropdown">
                <select name="e_hr" id="e_hr">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="colon2"> : </div>
              <div className="dropdown end_mins">
                <select name="s_min" id="e_min">
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
                <label class="container item">
                  {" "}
                  am
                  <input
                    type="radio"
                    name="end_time"
                    id="e_am"
                    value="am"
                  ></input>
                  <span class="checkmark"></span>
                </label>
                <label class="container item">
                  {" "}
                  pm
                  <input
                    type="radio"
                    name="end_time"
                    id="e_pm"
                    value="pm"
                  ></input>
                  <span class="checkmark"></span>
                </label>
              </div>

              <div className="item item-6">
                <u>Apply To</u>
              </div>
              <label class="container item item-7">
                {" "}
                Only This Day
                <input
                  type="radio"
                  name="apply_to"
                  id="rad1"
                  value="Only This Day"
                ></input>
                <span class="checkmark"></span>
              </label>
              <label class="container item item-8">
                {" "}
                Every Monday
                <input
                  type="radio"
                  name="apply_to"
                  id="rad2"
                  value="Every Day"
                ></input>
                <span class="checkmark"></span>
              </label>
              <label class="container item item-9">
                {" "}
                Everyday
                <input
                  type="radio"
                  name="apply_to"
                  id="rad3"
                  value="Everyday"
                ></input>
                <span class="checkmark"></span>
              </label>
              <div className="item item-10 ">
                <button
                  onClick={confirm_availability}
                  className="add_availability"
                  id="add_availability"
                  type = "submit"
                >
                  Add Availiability
                </button>
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
                  {(
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <div className = "day_header" key={day}>
                        <div className="f_day">{day}</div>
                        <div className="f_time">
                          <ul className="calendar_times"> 
                            {availability[day] && availability[day].length > 0 ? (
                              availability[day].map((timeSlot, index) => <li key={index}>{timeSlot}</li>)
                            ) : ( 
                              <li> Unavailable </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))
                  )}
                
                  
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
