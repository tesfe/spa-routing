import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch.js";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState("");

  const [posts, setPosts] = useState([]);

  const { dataa } = useAxiosFetch("http://localhost:3500/posts");

  useEffect(() => {
    setPosts(dataa);
  }, [dataa]);

  useEffect(() => {
    const filterSearch = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResult(filterSearch.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResult,
        posts,
        setPosts,
      }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
