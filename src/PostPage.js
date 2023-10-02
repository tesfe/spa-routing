import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext.js";

const PostPage = () => {
  const { id } = useParams();
  const { posts, handleDelete } = useContext(DataContext);
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="postPage">
      {post && (
        <>
          <h2>{post.title}</h2>

          <p>{post.body}</p>
          <button type="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
          <button type="button">
            <Link to={`/post/edit/${id}`}> Edit</Link>
          </button>
        </>
      )}
      {!post && (
        <>
          <h2>Post not found</h2>
          <p>well that's little disappointing</p>
          <p>
            <Link to="/">Visit our Home page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default PostPage;
