import React, { useState } from "react";
import "./LiveChat.css";
import ChatRoom from "../ChatRoom/ChatRoom";
import ChatLogin from "./ChatLogin";

export default function LiveChat({
  socket,
  setShowChat,
  showChat,
  setRoom,
  room,
  userName,
  postUserDB,
}) {
  const joinRoom = () => {
    if (userStateCheck) {
      socket.emit("join_room", room);
      setShowChat(true);
      postUserDB();
    } else {
      alert("Please Set User Name!");
    }
  };

  const userStateCheck = userName !== "" && room !== "";

  return (
    <div id="prelogin">
      {!showChat ? (
        <ChatLogin setRoom={setRoom} joinRoom={joinRoom} />
      ) : (
        <div id="postLogin">
          <ChatLogin setRoom={setRoom} joinRoom={joinRoom} />
          <ChatRoom socket={socket} username={userName} room={room} />
        </div>
      )}
    </div>
  );
}
