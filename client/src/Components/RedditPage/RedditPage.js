import React, { useState, useEffect } from "react";
import RedditPosts from "../RedditPosts/RedditPosts";
import { v4 as uuidv4 } from "uuid";
import "./RedditPage.css";

export default function RedditPage({
  setShowChat,
  socket,
  setChatType,
  chatType,
  setRedditRoom,
}) {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState("webdev");

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=9`).then(
      (r) => {
        if (r.status !== 200) {
          console.log(`${r.status} : Error has occured.`);
          return;
        }
        r.json().then((data) => {
          if (data !== null) {
            setArticles(data.data.children);
          }
        });
      }
    );
  }, [subreddit]);

  console.log(articles);

  return (
    <div className="redditPage">
      <label id="redSearchIndicator">
        r/
        <input
          spellCheck="false"
          id="subSearch"
          type="text"
          className="input"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
        />
      </label>
      {articles !== null
        ? articles.map((article) => (
            <RedditPosts
              key={uuidv4()}
              article={article.data}
              setShowChat={setShowChat}
              socket={socket}
              setChatType={setChatType}
              chatType={chatType}
              setRedditRoom={setRedditRoom}
            />
          ))
        : ""}
    </div>
  );
}
