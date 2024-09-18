import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter} from "react-router-dom"; /* importing BrowserRouter provided the react router DOM library */

/* wrapping our app component with BrowserRouter since we are using react router DOM components */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
