import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            No Hesitation
          </Link>
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
              {this.props.auth ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              ) : null}

              {this.props.auth ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/stats">
                    Stats
                  </Link>
                </li>
              ) : null}

              {this.props.auth ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/start">
                    Start
                  </Link>
                </li>
              ) : null}
            </ul>
            {/* the links should follow the order of the above link!*/}

            {this.props.auth ? (
              <Link
                className="btn btn-outline-danger"
                to="/"
                onClick={this.props.logOut}
              >
                Log Out
              </Link>
            ) : (
              <div>
                <Link className="btn btn-outline-primary" to="/login">
                  Log In
                </Link>

                <Link className="btn btn-outline-success" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
