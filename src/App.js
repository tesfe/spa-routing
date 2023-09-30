import Layout from "./Layout.js";
import React from "react";
import api from "./api/posts.js";
import Home from "./Home.js";
import Newpost from "./Newpost.js";
import About from "./About.js";
import Missing from "./Missing.js";
import PostPage from "./PostPage.js";
import EditPage from "./EditPage.js";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState("");
  const [title, setTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        //if response not in range of 200
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          //here we didnot get any response at all
          console.log(`Error:${error.message}`);
        }
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const filterSearch = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResult(filterSearch.reverse());
  }, [posts, search]);

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
  const handleEdit = async (id) => {
    const EditPost = { title: editTitle, body: editBody };

    try {
      const response = await api.put(`posts/${id}`, EditPost);

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditBody("");
      setEditTitle("");
      navigate("/");
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  };

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
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={searchResult} />} />

        <Route path="post">
          <Route
            index
            element={
              <Newpost
                title={title}
                setTitle={setTitle}
                postBody={postBody}
                setpostBody={setpostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
          <Route
            path="edit/:id"
            element={
              <EditPage
                posts={posts}
                editBody={editBody}
                setEditBody={setEditBody}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                handleEdit={handleEdit}
              />
            }
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
