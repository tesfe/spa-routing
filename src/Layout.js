import React from "react";
import Header from "./Header.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext.js";
const Layout = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <div className="App">
      <Header />
      <Nav search={search} setSearch={setSearch} />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
