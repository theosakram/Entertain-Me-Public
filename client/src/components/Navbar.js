import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ border: "1px solid lightgray", borderRadius: "5px" }}
      >
        <div className="navbar-brand">
          <h1 className="navbar-item" style={{ marginLeft: "15px" }}>
            <Link
              to="/"
              style={{ fontFamily: "Satisfy, cursive", color: "red" }}
            >
              Botullinum Injectum
            </Link>
          </h1>

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

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <Link to="/form" className="navbar-item">
                  Add
                </Link>
              </div>
            </div>
          </div>

          <div
            className="navbar-end"
            style={{ marginRight: "15px", marginBottom: "10px" }}
          >
            <div className="navbar-item">
              <div className="buttons">
                <a>
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
