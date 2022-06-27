import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home({
  socket,
  setUserName,
  userName,
  manualRoom,
  redditRoom,
}) {
  return (
    <div style={{ padding: "1rem" }} className="home">
      <h1 style={{ padding: "1rem" }}>HOME</h1>
      <input
        type="text"
        placeholder="Enter UserName!"
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input type="submit" value="Submit"></input>

      <p>{userName}</p>
      <p>{manualRoom !== "" ? manualRoom : "no manual rooms joined"}</p>
      <p>{redditRoom !== "" ? redditRoom : "no reddit rooms joined"}</p>
    </div>
  );
}
