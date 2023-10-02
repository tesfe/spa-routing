import React from "react";
import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext.js";
const Home = () => {
  const { searchResult } = useContext(DataContext);
  return (
    <main className="home">
      {searchResult.length ? (
        <Feed posts={searchResult} />
      ) : (
        <p style={{ margin: "2rem" }}>no posts to show</p>
      )}
    </main>
  );
};

export default Home;
