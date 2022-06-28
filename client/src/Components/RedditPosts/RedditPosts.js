import React from "react";
import "./RedditPosts.css";
import redditLogo from "/home/grantwe/project2/client/src/media/Reddit_Mark_OnWhite.png";
import { useNavigate } from "react-router-dom";

function RedditPosts({
  article,
  socket,
  setRedditRoom,
  setArtRef,
  setRedditTitle,
  postUserDB,
  putUserDB,
  redditRoom,
  userName,
  fetchJSON,
  // jsonData,
}) {
  const navigate = useNavigate();

  async function handleChatClick() {
    //sets state for article reference, reddit room, and title
    setArtRef(article);
    setRedditRoom(article.id);
    setRedditTitle(article.title);

    //grabs the current data before any posting/patching happens
    const jsonData = await fetchJSON();
    // const jsonData = await data.JSON();
    console.log(jsonData);
    //console.log(jsonData);
    // postOrPut();

    //joins room
    socket.emit("join_room", article.id);

    //json data doesn't exist ?? so we have to post
    // if (jsonData.length === 0) {
    //   console.log(jsonData);
    //   postUserDB({
    //     article: article,
    //     author: userName,
    //     redditTitle: article.title,
    //     redditRoom: article.id,
    //   });
    // } else {
    //do we find that the current userName(state) is equal to the data.author in DB?
    const user = jsonData.find((data) => {
      console.log(data);
      console.log(userName);
      const update = data.author === userName;
      return update;
    });

    /*
      If no data, post user data
      If user exists, then patch the user data

      Not Patch/Putting because not referencing ID? top level?

      how does PUT work? you can't use Query parameters! 

      ASYNC ISSUE???
      jsonData is not getting populated in time? 

     ** it's not finding update === true on the first run through! **
      */

    user
      ? putUserDB({
          id: user.id,
          article: article,
          author: userName,
          redditTitle: article.title,
          redditRoom: article.id,
        })
      : postUserDB({
          article: article,
          author: userName,
          redditTitle: article.title,
          redditRoom: article.id,
        });

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
