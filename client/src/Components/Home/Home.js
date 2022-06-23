import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [jsonData, setJsonData] = useState([]);

  function fetchRooms() {
    fetch(`http://localhost:3004/rooms`).then((r) => {
      if (r.status !== 200) {
        console.log(`${r.status} : Error has occured.`);
        return;
      }
      r.json().then((data) => {
        setJsonData(data);
      });
    });
  }

  const data = { username: "example" };

  function postData() {
    fetch("http://localhost:3004/rooms", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteData(id) {
    fetch(`http://localhost:3004/rooms/dD6zoIH`, {
      method: "DELETE",
      body: JSON.stringify(data.username),
    });
  }

  console.log(jsonData);

  return (
    <div style={{ padding: "1rem" }} className="home">
      <h1 style={{ padding: "1rem" }}>HOME</h1>
      <button style={{ padding: "1rem" }} onClick={fetchRooms}>
        FETCH
      </button>
      <button style={{ padding: "1rem" }} onClick={postData}>
        POST
      </button>
      <button style={{ padding: "1rem" }} onClick={deleteData}>
        DELETE
      </button>
    </div>
  );
}
