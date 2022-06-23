import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "../Components/NavBar/NavBar";
import LiveChat from "../Components/LiveChat/LiveChat";
import Home from "../Components/Home/Home";
import RedditPage from "../Components/RedditPage/RedditPage";
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://localhost:5050/");
  console.log(socket);

  const [showChat, setShowChat] = useState(false);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/redditpage"
          element={<RedditPage socket={socket} setShowChat={setShowChat} />}
        />
        <Route
          path="/livechat"
          element={
            <LiveChat
              socket={socket}
              setShowChat={setShowChat}
              showChat={showChat}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
