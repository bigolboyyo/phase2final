import React, { useState, useEffect } from "react";
import "./LiveChat.css";
import ChatRoom from "../ChatRoom/ChatRoom";
import io from "socket.io-client";

const project2branch = console.log("branch 2 created");
console.log(project2branch);

const socket = io.connect("http://localhost:5050/");

export default function LiveChat() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const userStateCheck = userName !== "" && room !== "";

  useEffect(() => {
    const socket = io.connect("http://localhost:5050/");
    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    if (userStateCheck) {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="liveChat">
      <h3 style={{ padding: "15px" }}>Join A Chat</h3>
      <input
        id="room_username"
        type="text"
        placeholder="John Smith..."
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        id="room_id"
        type="text"
        placeholder="Room ID"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom} id="joinRoomBtn">
        Join
      </button>

      <ChatRoom socket={socket} username={userName} room={room} />
    </div>
  );
}
