import React from "react";
import Feed from "./Feed";
const Home = ({ posts }) => {
  return (
    <main className="home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ margin: "2rem" }}>no posts to show</p>
      )}
    </main>
  );
};

export default Home;
