import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App/App";
// import { Beforeunload, useBeforeunload } from "react-beforeunload";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    {/* <Beforeunload> */}
    <App />
    {/* </Beforeunload> */}
  </Router>
  // </React.StrictMode>
);
