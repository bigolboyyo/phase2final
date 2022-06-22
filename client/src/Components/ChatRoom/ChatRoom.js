import React from "react";

function ChatRoom({ socket, username, room }) {
  return (
    <div>
      <h1 className="chat-header">Room: {room ? room : "no room"}</h1>
      <div className="chat-body">
        <h1>User: {username ? username : "no name"}</h1>
      </div>
      <h1 className="chat-footer">
        Socket: {socket.id ? socket.id : "no socket"}
      </h1>
    </div>
  );
}

export default ChatRoom;
