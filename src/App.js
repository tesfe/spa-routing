import Layout from "./Layout.js";
import React from "react";

import Home from "./Home.js";
import Newpost from "./Newpost.js";
import About from "./About.js";
import Missing from "./Missing.js";
import PostPage from "./PostPage.js";
import EditPage from "./EditPage.js";

import { Route, Routes } from "react-router-dom";

import { DataProvider } from "./context/DataContext.js";
function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="post">
            <Route index element={<Newpost />} />
            <Route path=":id" element={<PostPage />} />
            <Route path="edit/:id" element={<EditPage />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
