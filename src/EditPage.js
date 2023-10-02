import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "./context/DataContext";
const EditPage = () => {
  const { posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit } =
    useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  //this is a bit difficult part which i didn't get why refresh this url or page returns an
  //empty post which results in error message that says title or body property is undefined.
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  //the problem with the below code is once we setEditTitle or setEditBody we can type on the input field coz we rgidly put it for always,instead
  //we need to set it conditionally with effect hook whenthere is input field change ,then we are allowed to set it

  //   setEditTitle(post?.title);
  //   setEditBody(post?.body);

  return (
    <main className="edit">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="titlePost">Title</label>
        <input
          id="titlePost"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="Post">Post</label>
        <textarea
          type="text"
          id="Post"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit" onClick={() => handleEdit(post.id)}>
          Post
        </button>
      </form>
    </main>
  );
};

export default EditPage;
