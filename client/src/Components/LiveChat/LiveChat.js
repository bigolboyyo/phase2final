import React, { useState } from "react";
import "./LiveChat.css";
import ChatRoom from "../ChatRoom/ChatRoom";
import ChatLogin from "./ChatLogin";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5050/");
// console.log(socket);

export default function LiveChat({ socket, setShowChat, showChat }) {
  // console.log(socket);
  // debugger;
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (userStateCheck) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  // const [showChat, setShowChat] = useState(false);

  const userStateCheck = userName !== "" && room !== "";

  // useEffect(() => {
  //   const socket = io.connect("http://localhost:5050/livechat");

  //   return () => socket.disconnect();
  // }, []);

  return (
    <div id="prelogin">
      {!showChat ? (
        <ChatLogin
          setUserName={setUserName}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
      ) : (
        <div id="postLogin">
          <ChatLogin
            setUserName={setUserName}
            setRoom={setRoom}
            joinRoom={joinRoom}
          />
          <ChatRoom socket={socket} username={userName} room={room} />
        </div>
      )}
    </div>
  );
}
