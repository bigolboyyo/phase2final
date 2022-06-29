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

  const fetchJSON = async () => {
    let response = await fetch("http://localhost:3004/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    //console.log(response);
    return response;
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
    setRoom(room);
    return response;
  };

  const putUserDB = async (info) => {
    const roomData = {
      redditTitle: info.redditTitle,
      room: info.redditRoom || info.room,
      author: userName,
    };

    console.log(info);

    console.log(JSON.stringify(roomData));

    let response = await fetch(`http://localhost:3004/userData/${info.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    response = await response.json();
    // console.log(response);
    setRoom(room);
    return response;
  };

  const deleteFetch = async (id) => {
    const deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      // No need to have body, because we don't send nothing to the server.
    };

    const deletion = await fetch(
      `http://localhost:3004/userData/${id}`,
      deleteMethod
    )
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err));
    return deletion;
  };

  const deleteData = async () => {
    const data = await fetchJSON();
    console.log(data);

    const removal = data.find((user) => {
      return user.author === userName
        ? deleteFetch(user.id)
        : console.log("no user");
    });
    return removal;
  };

  //deleteFetch();
  //deleteData();

  socket.on("disconnect", deleteData());

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
              // jsonData={jsonData}
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
