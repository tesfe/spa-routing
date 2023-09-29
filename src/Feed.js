import React from "react";
import { Link } from "react-router-dom";
const Feed = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <Link to={`post/${post.id}`}>
            <h2>{post.title}</h2>
            <p> {post.datatime}</p>
          </Link>
          <p className="body">
            {post.body.length <= 25
              ? post.body
              : `${post.body.slice(0, 25)}...`}
          </p>
        </article>
      ))}
    </>
  );
};

export default Feed;
