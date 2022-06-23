import React from "react";

function ChatLogin({ setUserName, setRoom, joinRoom }) {
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
    </div>
  );
}

export default ChatLogin;
