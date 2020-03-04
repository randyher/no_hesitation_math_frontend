import React from "react";
import GameCard from "../components/GameCard";
import ResultsPage from "../components/ResultsPage";
import Loading from "../components/Loading";

class GameContainer extends React.Component {
  state = {
    displayResults: false,
    currentGame: {}
  };

  displayResults = game => {
    console.log(game);
    console.log(this.props);

    this.setState({
      displayResults: !this.state.displayResults,
      currentGame: game
    });
  };

  goBack = () => {
    this.setState({
      displayResults: false
    });
  };

  render() {
    let i = 0;
    const allGames = this.props.games.map(game => {
      i++;
      return (
        <GameCard
          key={game.id}
          game={game}
          num={i}
          displayResults={this.displayResults}
        />
      );
    });

    return (
      <div>
        {this.props.username ? (
          <div>
            <br />
            <h1>Welcome {this.props.username}!</h1>
            {/* <p>Current Grade: {this.props.grade}</p> */}
            <br />

            {this.state.displayResults ? (
              <ResultsPage
                results={this.state.currentGame}
                submittedAnswers={this.props.submittedAnswers}
                goBack={this.goBack}
                deleteGame={this.props.deleteGame}
              />
            ) : (
              <div className="ui link cards">{allGames}</div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default GameContainer;
