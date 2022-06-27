import React from "react";
import "./Home.css";

export default function Home({
  socket,
  setUserName,
  userName,
  manualRoom,
  redditRoom,
  redditTitle,
}) {
  return (
    <div style={{ padding: "1rem" }} className="home">
      <div style={{ padding: "1rem" }} className="intro">
        <h1>Welcome to the Reddit Hangout!</h1>
        <p style={{ padding: "1rem", fontStyle: "italic" }}>
          Instructional Video Below!
        </p>
      </div>
      <input
        type="text"
        placeholder="Enter UserName!"
        onChange={(e) => setUserName(e.target.value)}
      ></input>

      <div className="userInfo">
        <p style={{ padding: "0.75rem" }}>Your Name: {userName}</p>
        <p style={{ padding: "0.75rem" }}>
          Active Chat:{" "}
          {manualRoom !== "" ? manualRoom : "no manual rooms joined"}
        </p>
        <p style={{ padding: "0.75rem" }}>
          Current Reddit Chat:{" "}
          {redditTitle !== "" ? redditTitle : "Go find a chat!"}
        </p>
        <p style={{ padding: "0.25rem" }}>
          Reddit Chat ID: {redditRoom !== "" ? redditRoom : "N/A"}
        </p>
      </div>
    </div>
  );
}
