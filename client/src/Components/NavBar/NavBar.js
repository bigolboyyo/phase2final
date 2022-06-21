import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

let activeStyle = {
  textDecoration: "underline",
};

export default function NavBar() {
  return (
    <div className="navBar">
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/redditpage"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Reddit Page
      </NavLink>
      <NavLink
        to="/livechat"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Live Chat
      </NavLink>
    </div>
  );
}
