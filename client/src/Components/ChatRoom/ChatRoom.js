import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ChatRoom.css";

function ChatRoom({ socket, username, room }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatDiv" style={{ padding: "25px", margin: "7vh" }}>
      <div
        style={{ border: "solid", padding: "0.5rem" }}
        className="chat-header"
      >
        <p>Live Chat</p>
      </div>
      <div style={{ border: "solid", padding: "0.5rem" }} className="chat-body">
        {messageList.map((messageCont) => (
          <div key={uuidv4()} className="message">
            <>
              <div className="messageContent">
                <p>{messageCont.message}</p>
              </div>
              <div className="messageMeta">
                <p>{messageCont.time}</p>
                <p>{messageCont.author}</p>
              </div>
            </>
          </div>
        ))}
      </div>
      <div
        style={{ border: "solid", padding: "0.5rem" }}
        className="chat-footer"
      >
        <input
          type="text"
          placeholder="Hey!"
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
