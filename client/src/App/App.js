import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "../Components/NavBar/NavBar";
import LiveChat from "../Components/LiveChat/LiveChat";
import Home from "../Components/Home/Home";
import RedditPage from "../Components/RedditPage/RedditPage";
import io from "socket.io-client";
import RedditChat from "../Components/RedditChat/RedditChat";

const establishConnection = () => {
  const socket = io.connect("http://localhost:5050/");
  return socket;
};
const socket = establishConnection();

function App() {
  const [showChat, setShowChat] = useState(false);
  const [redditTitle, setRedditTitle] = useState("");
  const [room, setRoom] = useState("");
  const [redditRoom, setRedditRoom] = useState("");
  const [artRef, setArtRef] = useState({});
  const [userName, setUserName] = useState("");

  // async function postUserDB(info) {
  //   const userData = {
  //     room: info.redditRoom || info.room,
  //     userName,
  //   };
  //   fetch("http://localhost:3004/userData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRoom(room);
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  // function fetchJSON() {
  //   //simply grab all data
  //   fetch(`http://localhost:3004/userData`).then((r) => {
  //     if (r.status !== 200) {
  //       console.log(`${r.status} : Error has occured.`);
  //       return;
  //     }
  //     r.json().then((data) => {
  //       setJsonData(data);
  //     });
  //   });
  // }

  const [jsonData, setJsonData] = useState([]);

  const fetchJSON = async () => {
    let response = await fetch("http://localhost:3004/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    console.log(response);
    setJsonData(response);
  };

  const postUserDB = async (info) => {
    const roomData = {
      redditTitle: info.redditTitle,
      room: info.redditRoom || info.room,
      author: userName,
    };

    let response = await fetch("http://localhost:3004/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    response = await response.json();
    console.log(response);
    setRoom(room);
    return response;
  };

  const putUserDB = async (info) => {
    const roomData = {
      redditTitle: info.redditTitle,
      room: info.redditRoom || info.room,
      author: userName,
    };

    let response = await fetch("http://localhost:3004/userData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    response = await response.json();
    console.log(response);
    setRoom(room);
    return response;
  };

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              socket={socket}
              userName={userName}
              setUserName={setUserName}
              manualRoom={room}
              redditRoom={redditRoom}
              redditTitle={redditTitle}
            />
          }
        />
        <Route
          path="/redditpage"
          element={
            <RedditPage
              socket={socket}
              setRedditRoom={setRedditRoom}
              setArtRef={setArtRef}
              userName={userName}
              setRedditTitle={setRedditTitle}
              postUserDB={postUserDB}
              putUserDB={putUserDB}
              redditRoom={redditRoom}
              fetchJSON={fetchJSON}
              jsonData={jsonData}
            />
          }
        />
        <Route
          path="/livechat"
          element={
            <LiveChat
              socket={socket}
              setShowChat={setShowChat}
              showChat={showChat}
              room={room}
              setRoom={setRoom}
              userName={userName}
              postUserDB={postUserDB}
            />
          }
        />
        <Route
          path="/redditchat"
          element={
            <RedditChat
              socket={socket}
              artRef={artRef}
              userName={userName}
              redditRoom={redditRoom}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
