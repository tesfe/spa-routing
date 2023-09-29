import React from "react";

const Newpost = ({ title, setTitle, postBody, setpostBody, handleSubmit }) => {
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
