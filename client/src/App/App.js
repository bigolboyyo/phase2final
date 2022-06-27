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
  const [room, setRoom] = useState("");
  const [artRef, setArtRef] = useState({});
  const [userName, setUserName] = useState("");

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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
