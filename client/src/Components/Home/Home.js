import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home({ socket }) {
  console.log(socket);

  return (
    <div style={{ padding: "1rem" }} className="home">
      <h1 style={{ padding: "1rem" }}>HOME</h1>
      <input type="text" placeholder="Enter UserName!"></input>
      <input type="submit"></input>
    </div>
  );
}
