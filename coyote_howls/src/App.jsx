import { Route, Routes } from "react-router-dom";
import "./App.css";

/* importing each component from their appropriate locations */
import {Navbar} from "./components/Navbar";
 /*import Message from "./components/pages/Message";  */
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Log_in from "./components/pages/Log_in";
import Home from "./components/pages/Home";
import Faculty_login from "./components/pages/Faculty_login";
import Student_login from "./components/pages/Student_login";
import StudentDashboard from "./components/pages/StudentDashboard";
import FacultyDashboard from "./components/pages/FacultyDashboard";
import Student_Meeting from "./components/pages/Student_Meeting"; 
import Faculty_Modify from "./components/pages/Faculty_Modify";

/*Routing each component from pages to the appropriate url on the website */
function App() {
  return (
    <div className= "App">
      <Navbar />
      <Routes>
        <Route path= "/" element={<Home/>} />
     {/*   <Route path= "/message" element={<Message/>} />  */}
        <Route path= "/about" element={<About/>} />
        <Route path= "/contact" element={<Contact/>} />
        <Route path= "/log_in" element={<Log_in/>} />
        <Route path="/faculty" element={<Faculty_login />} />
        <Route path="/student" element={<Student_login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/FacultyDashboard" element={<FacultyDashboard />} />
        <Route path="/Student_Meeting" element={<Student_Meeting />} />
        <Route path="/Faculty_Modify" element={<Faculty_Modify />} />
      </Routes>
    </div>  
  );
}

export default App
