import React, { Component } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Auth from "../modules/Auth";
import Home from "./Home";
import LogIn from "./LoginForm";
import SignUp from "./SignupForm";
import GameContainer from "../containers/GameContainer";
import Sheet from "../containers/Sheet";
import NumberSentence from "./NumberSentence";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated(),
    username: "",
    games: []
  };

  componentDidMount() {
    if (this.state.auth == true) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          token: Auth.getToken(),
          Authorization: `Token ${Auth.getToken()}`
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({
            username: res.user.username,
            games: res.games
          });
        });
    }
  }

  handleRegisterSubmit = (e, info) => {
    e.preventDefault();
    console.log(info);

    fetch(`http://localhost:3000/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: info })
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated()
        });
        //ErrorCatch-- later!
      });
  };

  handleLoginSubmit = (e, info) => {
    e.preventDefault();
    console.log(info);

    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated()
        });
      })
      .catch(err => console.log(err));
  };

  handleLogOut = () => {
    console.log("Out");
    fetch(`http://localhost:3000/api/v1/logout`, {
      method: "DELETE",
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => {
        Auth.deauthenticateToken();
        this.setState({
          auth: Auth.isUserAuthenticated()
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Navbar auth={this.state.auth} logOut={this.handleLogOut} />

        {/*Under the Nav Bar*/}
        <Switch>
          <Route
            path="/login"
            render={() =>
              this.state.auth ? (
                <Redirect to="/" />
              ) : (
                <LogIn handleSubmit={this.handleLoginSubmit} />
              )
            }
          />
          <Route
            path="/signup"
            render={() =>
              this.state.auth ? (
                <Redirect to="/" />
              ) : (
                <SignUp handleSubmit={this.handleRegisterSubmit} />
              )
            }
          />
          <Route path="/start" render={() => <Sheet />} />
          {/*The Auth-options above*/}
          <Route
            path="/profile"
            render={() =>
              this.state.auth ? (
                <div>
                  <GameContainer
                    username={this.state.username}
                    games={this.state.games}
                  />
                </div>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          {/*Home Page is Under*/}
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
