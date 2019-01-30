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
    users: [],
    games: []
  };

  componentDidMount() {
    // fetch("http://localhost:3000/api/v1/users")
    //   .then(res => res.json())
    //   .then(users => {
    //     this.setState({
    //       users: users
    //     });
    //   });
    // fetch("http://localhost:3000/api/v1/games")
    //   .then(res => res.json())
    //   .then(games => {
    //     this.setState({
    //       games: games
    //     });
    //   });
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

    fetch(`http://localhost:3000/api/v1/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ info })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated()
        });
        //ErrorCatch-- later!
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Navbar />

        {/*Under the Nav Bar*/}
        <Switch>
          <Route
            path="/login"
            render={() => <LogIn handleSubmit={this.handleLoginSubmit} />}
          />
          <Route
            path="/signup"
            render={() => <SignUp handleSubmit={this.handleRegisterSubmit} />}
          />
          <Route path="/start" render={() => <Sheet />} />
          {/*The Auth-options above*/}
          <Route
            path="/profile"
            render={() => {
              return (
                <div>
                  <GameContainer games={this.state.games} />
                </div>
              );
            }}
          />

          {/*Home Page is Under*/}
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
