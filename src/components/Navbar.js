import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            No Hesitation
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Nav Bar Items Under*/}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/start">
                  Start
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
            </ul>
            {/* the links should follow the order of the above link!*/}

            <a className="btn btn-outline-primary" href="/login">
              Log In
            </a>

            <a className="btn btn-outline-success" href="/signup">
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
