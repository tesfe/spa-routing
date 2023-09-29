import Layout from "./Layout.js";
import React from "react";
import Home from "./Home.js";
import Newpost from "./Newpost.js";
import About from "./About.js";
import Missing from "./Missing.js";
import PostPage from "./PostPage.js";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState("");
  const [title, setTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My 1 post",
      datetime: "My first post",
      body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, cum molestias",
    },
    {
      id: 2,
      title: "My 2 post",
      datetime: "My first post",
      body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, cum molestias",
    },
    {
      id: 3,
      title: "My 3 post",
      datetime: "My first post",
      body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, cum molestias",
    },
    {
      id: 4,
      title: "My 4 post",
      datetime: "My first post",
      body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, cum molestias",
    },
  ]);
  useEffect(() => {
    const filterSearch = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResult(filterSearch.reverse());
  }, [posts, search]);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    const remainPost = posts.filter((post) => post.id.toString() !== id);
    setPosts(remainPost);
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const newPost = { id, title, body: postBody };
    const allPost = [...posts, newPost];
    setPosts(allPost);
    setpostBody("");
    setTitle("");
    navigate("/");
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
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
