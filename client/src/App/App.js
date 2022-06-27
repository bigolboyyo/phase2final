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
  const [redditRoom, setRedditRoom] = useState("");
  const [redditTitle, setRedditTitle] = useState("");
  const [room, setRoom] = useState("");
  const [artRef, setArtRef] = useState({});
  const [userName, setUserName] = useState("");

  //FOR SOME FUCKING REASON THE FETCH CAUSE RE RENDER/re connection

  const userData = {
    userName: userName,
    room: room,
    redditRoom: redditRoom,
  };

  console.log(userData);

  function postUserDB() {
    fetch("http://localhost:3004/userData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
              setShowChat={setShowChat}
              setRedditRoom={setRedditRoom}
              setArtRef={setArtRef}
              userName={userName}
              setRedditTitle={setRedditTitle}
              postUserDB={postUserDB}
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
              redditRoom={redditRoom}
              artRef={artRef}
              userName={userName}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
