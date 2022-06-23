import React from "react";
import "./RedditPosts.css";
import redditLogo from "/home/grantwe/project2/client/src/media/Reddit_Mark_OnWhite.png";
import { useNavigate } from "react-router-dom";
//import io from "socket.io-client";

// let activeStyle = {
//   textDecoration: "underline",
// };

function RedditPosts({
  article,
  socket,
  // setShowChat,
  // setChatType,
  // chatType,
  setRedditRoom,
}) {
  const navigate = useNavigate();

  console.log(socket);

  function handleChatClick() {
    socket.emit("join_room", article.id);
    // setShowChat(true);
    // setChatType("/redditchat");
    setRedditRoom(article.id);
    navigate("/redditchat");
  }

  return (
    <article className="redditPosts">
      <a
        id="postLink"
        href={`https://reddit.com/${article.permalink}`}
        rel="noreferrer"
        target="_blank"
      >
        <h3>{article.title}</h3>
        <img
          id="redThumbnail"
          src={article.thumbnail === "self" ? redditLogo : article.thumbnail}
          alt="noPicFound"
        />
      </a>
      <a
        href={`https://www.reddit.com/user/${article.author}/`}
        rel="noreferrer"
        target="_blank"
      >
        <span id="redAuthor">Author: {article.author}</span>
      </a>
      <span id="redUpvotes">Upvotes: {article.ups}</span>

      {/* <Link
        to="/livechat"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      > */}
      <button
        onClick={handleChatClick}
        style={{ padding: "1rem" }}
        id="start-chat"
      >
        Start Chat
      </button>
      {/* </Link> */}
    </article>
  );
}

export default RedditPosts;
