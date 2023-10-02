import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch.js";
import { useNavigate } from "react-router-dom";
import api from "../api/posts.js";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState("");
  const [title, setTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResult,
        setTitle,
        title,
        setpostBody,
        postBody,
        handleSubmit,
        posts,
        handleDelete,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleEdit,
      }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
