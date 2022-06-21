import React, { useEffect } from "react";
import "./LiveChat.css";

import io from "socket.io-client";

export default function LiveChat() {
  useEffect(() => {
    const socket = io.connect("http://localhost:5050/");
    return () => socket.disconnect();
  });

  return (
    <div className="liveChat">
      <input id="sendMsg" placeholder="message..." />
      <button id="sendBtn">Send</button>
    </div>
  );
}
