import React from "react";
import { Link } from "react-router-dom";
const Nav = ({ search, setSearch }) => {
  return (
    <nav>
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link className="navLink" to="/">
            home
          </Link>
        </li>
        <li>
          <Link className="navLink" to="post">
            post
          </Link>
        </li>
        <li>
          <Link className="navLink" to="about">
            about
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
