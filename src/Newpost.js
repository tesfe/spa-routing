import React from "react";
import api from "./api/posts";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "./context/DataContext.js";

const Newpost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const newPost = { id, title, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setpostBody("");
      setTitle("");
      navigate("/");
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  };

  return (
    <main className="newPost">
      <form onSubmit={handleSubmit}>
        <label htmlFor="titlePost">Title</label>
        <input
          id="titlePost"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="Post">Post</label>
        <textarea
          type="text"
          id="Post"
          required
          value={postBody}
          onChange={(e) => setpostBody(e.target.value)}
        />
        <button type="submit"> Post</button>
      </form>
    </main>
  );
};

export default Newpost;
