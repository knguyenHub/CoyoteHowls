import { Route, Routes } from "react-router-dom";
import "./App.css";
/* importing each component from their appropriate locations */
import {Navbar} from "./components/Navbar";
import Message from "./components/pages/Message";
import { About } from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Log_in from "./components/pages/Log_in";
import Home from "./components/pages/Home";


/*Routing each component from pages to the appropriate url on the website */
function App() {
  return (
    <div className= "App">
      <Navbar />
      <Routes>
        <Route path= "/Home" element={<Home/>} />
        <Route path= "/message" element={<Message/>} />
        <Route path= "/about" element={<About/>} />
        <Route path= "/contact" element={<Contact/>} />
        <Route path= "/log_in" element={<Log_in/>} />
      </Routes>
    </div>
  );
}

export default App
