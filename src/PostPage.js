import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext.js";
import api from "./api/posts.js";
const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  const post = posts.find((post) => post.id.toString() === id);
  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);

      const remainPost = posts.filter((post) => post.id !== id);
      setPosts(remainPost);
      navigate("/");
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  };
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
