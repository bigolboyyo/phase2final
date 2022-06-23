import React from "react";
import "./RedditPosts.css";
import redditLogo from "/home/grantwe/project2/client/src/media/Reddit_Mark_OnWhite.png";
import { useNavigate } from "react-router-dom";

function RedditPosts({
  article,
  socket,
  // setShowChat,
  // setChatType,
  // chatType,
  setRedditRoom,
  setArtRef,
}) {
  const navigate = useNavigate();

  // console.log(article);

  function handleChatClick() {
    socket.emit("join_room", article.id);
    // setShowChat(true);
    // setChatType("/redditchat");
    setRedditRoom(article.id);
    setArtRef(article);
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

      <button
        onClick={handleChatClick}
        style={{ padding: "1rem" }}
        id="start-chat"
      >
        Start Chat
      </button>
    </article>
  );
}

export default RedditPosts;
