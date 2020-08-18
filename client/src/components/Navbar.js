import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../App";

function Navbar() {
  const { theme, changeTheme } = useContext(context);
  const color = theme === "light" ? "dark" : "light";

  return (
    <>
      <nav
        className={`navbar ${theme === "light" ? "is-light" : "is-dark"}`}
        role="navigation"
        aria-label="main navigation"
        style={{
          borderRight: `1px solid ${theme === "light" ? "lightgray" : "gray"}`,
          borderLeft: `1px solid ${theme === "light" ? "lightgray" : "gray"}`,
          borderBottom: `1px solid ${theme === "light" ? "lightgray" : "gray"}`,
          borderRadius: "5px",
        }}
      >
        <div className="navbar-brand">
          <h1 className="navbar-item" style={{ marginLeft: "15px" }}>
            <Link
              to="/"
              style={{
                color: theme === "light" ? "red" : "#009B72",
              }}
            >
              Botullinum Injectum
            </Link>
          </h1>

          <div
            className="panel-block"
            style={{ borderBottomColor: theme === "light" ? "white" : "black" }}
          >
            <p className="control has-icons-left">
              <input
                className="input is-dark"
                type="text"
                placeholder="Search by Title"
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/movies" className="navbar-item">
              Movies
            </Link>
            <Link to="/series" className="navbar-item">
              Series
            </Link>
          </div>

          <div
            className="navbar-end"
            style={{ marginRight: "15px", marginBottom: "10px" }}
          >
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  to="/form"
                  style={{ color: theme === "light" ? "red" : "#009B72" }}
                >
                  <i class="fas fa-plus"></i>
                </Link>
              </div>
            </div>

            <div className="navbar-item">
              <div className="buttons">
                <Link
                  to="/favs"
                  style={{ color: theme === "light" ? "red" : "#009B72" }}
                >
                  <i class="fas fa-heart"></i>
                </Link>
              </div>
            </div>

            <div className="navbar-item">
              <div className="buttons">
                <a
                  onClick={() => changeTheme(color)}
                  style={{ color: theme === "light" ? "red" : "#009B72" }}
                >
                  <i className="fas fa-adjust"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
