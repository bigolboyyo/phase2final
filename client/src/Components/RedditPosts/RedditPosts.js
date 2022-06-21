import React from "react";
import "./RedditPosts.css";
import redditLogo from "/home/grantwe/project2/client/src/media/Reddit_Mark_OnWhite.png";

function RedditPosts({ article }) {
  console.log(article);
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
    </article>
  );
}

export default RedditPosts;
