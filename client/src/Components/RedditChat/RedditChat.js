import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./RedditChat.css";
import redditLogo from "/home/grantwe/project2/client/src/media/Reddit_Mark_OnWhite.png";

function RedditChat({ socket, article, redditRoom, artRef, userName }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMsg !== "") {
      const messageData = {
        room: redditRoom,
        author: userName,
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
    <div className="redditChatPage">
      <article className="redditPosts">
        <a
          id="postLink"
          href={`https://reddit.com/${artRef.permalink}`}
          rel="noreferrer"
          target="_blank"
        >
          <h3>{artRef.title}</h3>
          <img
            id="redThumbnail"
            src={artRef.thumbnail === "self" ? redditLogo : artRef.thumbnail}
            alt="noPicFound"
          />
        </a>
        <a
          href={`https://www.reddit.com/user/${artRef.author}/`}
          rel="noreferrer"
          target="_blank"
        >
          <span id="redAuthor">Author: {artRef.author}</span>
        </a>
        <span id="redUpvotes">Upvotes: {artRef.ups}</span>
      </article>

      <div className="chatDiv" style={{ padding: "25px", margin: "7vh" }}>
        <div
          style={{ border: "solid", padding: "0.5rem" }}
          className="chat-header"
        >
          <p>Live Chat</p>
        </div>
        <div
          style={{ border: "solid", padding: "0.5rem" }}
          className="chat-body"
        >
          {messageList.map((messageCont) => (
            <div key={uuidv4()} className="message">
              <>
                <div className="messageContent">
                  <p>{messageCont.message}</p>
                </div>
                <div className="messageMeta">
                  <p>{messageCont.time}</p>
                  <p>
                    {messageCont.author !== ""
                      ? messageCont.author
                      : "Anonymous"}
                  </p>
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
    </div>
  );
}

export default RedditChat;
