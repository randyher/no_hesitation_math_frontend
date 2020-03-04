import React, { Component } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Auth from "../modules/Auth";
import Home from "./Home";
import LogIn from "./LoginForm";
import SignUp from "./SignupForm";
import GameContainer from "../containers/GameContainer";
import Sheet from "../containers/Sheet";
import Stats from "./Stats";

import { Switch, Redirect, Route } from "react-router-dom";

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated(),
    username: "",
    currentGrade: "",
    games: [],
    problems: [],
    filteredProblems: [],
    additionOnly: false,
    subtractionOnly: false,
    doubleAndHalf: false,
    tensOnly: false,
    id: 0,
    inError: "",
    upError: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("https://native-nhm-api.herokuapp.com/problems")
      .then(res => res.json())
      .then(probs => {
        this.setState({
          problems: probs,
          filteredProblems: probs
        });
      });

    if (this.state.auth === true) {
      fetch("https://native-nhm-api.herokuapp.com/profile", {
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
            currentGrade: res.user.grade,
            games: res.games,
            id: res.user.id
          });
        });
    }
  };

  handleRegisterSubmit = (e, info) => {
    e.preventDefault();
    console.log(info);

    fetch(`https://native-nhm-api.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: info })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ upError: res.error });
        } else {
          Auth.authenticateToken(res.jwt);
          this.setState({
            username: res.user.username,
            currentGrade: res.user.grade,
            games: res.user_games,
            auth: Auth.isUserAuthenticated(),
            inError: "",
            upError: []
          });
        }
        //ErrorCatch-- later!
      });
  };

  handleLoginSubmit = (e, info) => {
    e.preventDefault();
    console.log(info);
    const userData = {
      user: {
        username: info.username,
        password: info.password
      }
    };

    fetch(`https://native-nhm-api.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          console.log(res);
          this.setState({ inError: res.message });
        } else {
          Auth.authenticateToken(res.jwt);
          this.setState({
            username: res.user.username,
            currentGrade: res.user.grade,
            games: res.user_games,
            auth: Auth.isUserAuthenticated(),
            inError: "",
            upError: []
          });
        }
      });
  };

  handleLogOut = async () => {
    this.setState(
      { auth: false, username: "", currentGrade: "", games: "" },
      () => {
        Auth.deauthenticateToken();
      }
    );
  };

  addGame = newGame => {
    if (this.state.additionOnly) {
      newGame["game_type"] = "Addition Only";
    } else if (this.state.subtractionOnly) {
      newGame["game_type"] = "Subtraction Only";
    } else if (this.state.doubleAndHalf) {
      newGame["game_type"] = "Doubles & Halves Only";
    } else if (this.state.tensOnly) {
      newGame["game_type"] = "Tens Only";
    } else {
      newGame["game_type"] = "All";
    }

    const gameDataWithUser = {
      ...newGame,
      user_id: this.state.id
    };
    console.log(this.state);
    console.log(newGame);
    fetch(`https://native-nhm-api.herokuapp.com/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`
      },
      body: JSON.stringify(gameDataWithUser)
    })
      .then(res => res.json())
      .then(game => {
        this.setState({
          games: [...this.state.games, game],
          additionOnly: false,
          subtractionOnly: false,
          doubleAndHalf: false,
          tensOnly: false,
          inError: ""
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
        filteredProblems: additionOnlyProblems
      });
    } else {
      this.setState({
        additionOnly: false,
        filteredProblems: original
      });
    }
  };

  filterSubtractQuestions = () => {
    let original = [...this.state.problems];

    let subOnlyProblems = this.state.problems.filter(problem => {
      return problem.problem_type.split(" ")[0] === "Subtraction";
    });

    if (!this.state.subtractionOnly) {
      this.setState({
        subtractionOnly: true,
        filteredProblems: subOnlyProblems
      });
    } else {
      this.setState({
        subtractionOnly: false,
        filteredProblems: original
      });
    }
  };

  filterHalveQuestions = () => {
    let original = [...this.state.problems];

    let halfOnlyProblems = this.state.problems.filter(problem => {
      return (
        problem.problem_type.split(" ")[1] === "Doubles" ||
        problem.problem_type.split(" ")[1] === "Halving"
      );
    });

    if (!this.state.doubleAndHalf) {
      this.setState({
        doubleAndHalf: true,
        filteredProblems: halfOnlyProblems
      });
    } else {
      this.setState({
        doubleAndHalf: false,
        filteredProblems: original
      });
    }
  };

  filterTensQuestions = () => {
    console.log("tens");
    let original = [...this.state.problems];

    let tensOnlyProblems = this.state.problems.filter(problem => {
      return problem.problem_type.split(" ")[1] === "Tens";
    });

    if (!this.state.tensOnly) {
      this.setState({
        tensOnly: true,
        filteredProblems: tensOnlyProblems
      });
    } else {
      this.setState({
        tensOnly: false,
        filteredProblems: original
      });
    }
  };

  // deleteGame = (e, game) => {
  //   fetch(`http://localhost:3000/api/v1/games/${game.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${Auth.getToken()}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         games: data
  //       });
  //
  //       return <Redirect to="/" />;
  //     });
  // };

  render() {
    console.log(this.state);
    const numberSentences = [];
    this.state.filteredProblems.forEach(problem => {
      // here I will put
      // if problem.grade === currentGrade
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
                <LogIn
                  handleSubmit={this.handleLoginSubmit}
                  error={this.state.inError}
                />
              )
            }
          />
          <Route
            path="/stats"
            render={() =>
              this.state.auth ? (
                <div>
                  <Stats data={this.state.games} />
                </div>
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/signup"
            render={() =>
              this.state.auth ? (
                <Redirect to="/" />
              ) : (
                <SignUp
                  handleSubmit={this.handleRegisterSubmit}
                  errors={this.state.upError}
                />
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
                filterHalveQuestions={this.filterHalveQuestions}
                filterTensQuestions={this.filterTensQuestions}
                addBoolean={this.state.additionOnly}
                subBoolean={this.state.subtractionOnly}
                halfBoolean={this.state.doubleAndHalf}
                tensBoolean={this.state.tensOnly}
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
                    grade={this.state.currentGrade}
                    deleteGame={this.deleteGame}
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
