import React, { Component } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Auth from "../modules/Auth";
import Home from "./Home";
import LogIn from "./LoginForm";
import SignUp from "./SignupForm";
import GameContainer from "../containers/GameContainer";
import Sheet from "../containers/Sheet";

import { Switch, Redirect, Route } from "react-router-dom";

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated(),
    username: "",
    allGames: [],
    games: [],
    problems: [],
    filteredProblems: [],
    gameproblems: [],
    additionOnly: false,
    subtractionOnly: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("http://localhost:3000/api/v1/problems")
      .then(res => res.json())
      .then(probs => {
        this.setState({
          problems: probs,
          filteredProblems: probs
        });
      });

    fetch("http://localhost:3000/api/v1/gamesproblems")
      .then(res => res.json())
      .then(all => {
        this.setState({
          gamesproblems: all
        });
      });

    fetch("http://localhost:3000/api/v1/games")
      .then(res => res.json())
      .then(games => {
        this.setState({
          allGames: games
        });
      });

    if (this.state.auth === true) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          token: Auth.getToken(),
          Authorization: `Token ${Auth.getToken()}`
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            username: res.user.username,
            games: res.games
          });
        });
    }
  };

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
        if (res.token === undefined) {
          return <Redirect to="/login" />;
        }

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

  addGame = newGame => {
    let answerCount = 0;

    fetch(`http://localhost:3000/api/v1/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      },
      body: JSON.stringify({
        game: newGame
      })
    })
      .then(res => res.json())
      .then(res => {
        this.getData();
      })
      .then(data => {
        newGame.problems.forEach(problem => {
          let num = this.state.allGames.length + 1;

          fetch(`http://localhost:3000/api/v1/gamesproblems`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              game_id: num,
              problem_id: problem.id,
              answer: newGame.answers[answerCount]
            })
          });
          answerCount++;
        });
      });
  };

  filterAddQuestions = () => {
    let original = [...this.state.problems];

    let additionOnlyProblems = this.state.problems.filter(problem => {
      return problem.problem_type.split(" ")[0] === "Addition";
    });

    if (!this.state.additionOnly) {
      this.setState({
        additionOnly: true,
        subtractionOnly: false,
        filteredProblems: additionOnlyProblems
      });
    } else {
      this.setState({
        additionOnly: false,
        filteredProblems: original
      });
    }
    console.log(this.state.filteredProblems);
  };

  filterSubtractQuestions = () => {
    let original = [...this.state.problems];

    let subOnlyProblems = this.state.problems.filter(problem => {
      return problem.problem_type.split(" ")[0] === "Subtraction";
    });

    if (!this.state.subtractionOnly) {
      this.setState({
        additionOnly: false,
        subtractionOnly: true,
        filteredProblems: subOnlyProblems
      });
    } else {
      this.setState({
        subtractionOnly: false,
        filteredProblems: original
      });
    }
    console.log(this.state.filteredProblems);
  };

  render() {
    const numberSentences = [];
    this.state.filteredProblems.forEach(problem => {
      numberSentences.push(problem.number_sentence);
    });

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
          <Route
            path="/start"
            render={() => (
              <Sheet
                addGame={this.addGame}
                problems={this.state.problems}
                numberSentences={numberSentences}
                filterAddQuestions={this.filterAddQuestions}
                filterSubtractQuestions={this.filterSubtractQuestions}
                addBoolean={this.state.additionOnly}
                subBoolean={this.state.subtractionOnly}
              />
            )}
          />
          {/*The Auth-options above*/}
          <Route
            path="/profile"
            render={() =>
              this.state.auth ? (
                <div>
                  <GameContainer
                    username={this.state.username}
                    games={this.state.games}
                    allGames={this.state.allGames}
                    submittedAnswers={this.state.gamesproblems}
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
