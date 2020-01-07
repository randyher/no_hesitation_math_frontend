import React from "react";
import NumberSentence from "./NumberSentence";

class ResultsPage extends React.Component {
  state = {
    feedback: []
  };

  displaySentence = () => {
    let compiled = this.props.results.number_sentences
      .split(" / ")
      .map(numberSentence => {
        const numbers = numberSentence.split(/[\s=]+/);
        let correct = false;
        if (
          parseInt(numbers[0]) + parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "+"
        ) {
          correct = true;
        }

        if (
          parseInt(numbers[0]) - parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "-"
        ) {
          correct = true;
        }

        return (
          <div className="col-6 col-sm-4">
            {numberSentence}
            {correct ? (
              <i className="correctAnswer">&#x2713;</i>
            ) : (
              <i className="incorrectAnswer">&#x2718;</i>
            )}
          </div>
        );
      });

    return compiled;
  };

  // displayFeedback = () => {
  //   let feedback = [];
  //   let incorrectArray = this.props.results.number_sentences
  //     .split(" / ")
  //     .filter(numberSentence => {
  //       const numbers = numberSentence.split(/[\s=]+/);
  //       let notCorrect = true;
  //       if (
  //         parseInt(numbers[0]) + parseInt(numbers[2]) ===
  //           parseInt(numbers[3]) &&
  //         numbers[1] === "+"
  //       ) {
  //         notCorrect = false;
  //       }

  //       if (
  //         parseInt(numbers[0]) - parseInt(numbers[2]) ===
  //           parseInt(numbers[3]) &&
  //         numbers[1] === "-"
  //       ) {
  //         notCorrect = false;
  //       }
  //       return notCorrect;
  //     });

  //   incorrectArray.map(numberSentence => {
  //     const numbers = numberSentence.split(/[\s=]+/);

  //     if (
  //       parseInt(numbers[0]) === 10 ||
  //       parseInt(numbers[2]) === 10 ||
  //       parseInt(numbers[0]) + parseInt(numbers[2]) === 10
  //     ) {
  //       feedback.push(<li> Tens Facts</li>);
  //     }
  //   });

  //   return feedback;
  // };

  render() {
    return (
      <div>
        <h4>Correct: {this.props.results.score} / 24</h4>
        <h4>Time Left: {this.props.results.time_remaining} seconds</h4>
        <h4>Question Type: {this.props.results.game_type}</h4>
        <br />
        <div className="row">{this.displaySentence()}</div>
        <br />
        {/*this.props.results.score !== 24 ? (
          <div className="ui large message">
            <div className="header">Feedback</div>
            <p className="directions">
              Practice:
              {this.displayFeedback()}
            </p>
          </div>
        ) : null*/}
        <button className="ui left floated button" onClick={this.props.goBack}>
          Back
        </button>
        {/*
        <i
          class="trash icon"
          onClick={e => this.props.deleteGame(e, this.props.results)}
        >
          &nbsp;Delete
        </i>
      */}
      </div>
    );
  }
}

export default ResultsPage;
