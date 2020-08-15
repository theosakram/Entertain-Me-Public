import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ borderBottom: "1px solid lightgray" }}
      >
        <div className="navbar-brand">
          <h1 className="navbar-item">
            <Link to="/" style={{ fontFamily: "Satisfy, cursive" }}>
              BI
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

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a>
                  <i class="fas fa-adjust"></i>
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
