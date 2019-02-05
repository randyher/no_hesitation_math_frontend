import React from "react";

class ResultsPage extends React.Component {
  displaySentence = () => {
    let compiled = [];
    let log = [];
    let filteredAnswers = this.props.submittedAnswers.filter(
      answer => answer.game_id === this.props.results.id
    );

    filteredAnswers.forEach(answer => {
      this.props.results.problems.forEach(numberSentence => {
        if (!log.includes(answer)) {
          if (numberSentence.id === answer.problem_id) {
            let splitData = numberSentence.number_sentence.split(/[\s=]+/);

            if (
              splitData[1] === "+" &&
              parseInt(splitData[0]) + parseInt(splitData[2]) === answer.answer
            ) {
              compiled.push(
                <div className="col-6 col-sm-4">
                  {numberSentence.number_sentence} {answer.answer}{" "}
                  <i className="correctAnswer">&#x2713;</i>
                </div>
              );
            } else if (
              splitData[1] === "-" &&
              parseInt(splitData[0]) - parseInt(splitData[2]) === answer.answer
            ) {
              compiled.push(
                <div className="col-6 col-sm-4">
                  {numberSentence.number_sentence} {answer.answer}{" "}
                  <i className="correctAnswer">&#x2713;</i>
                </div>
              );
            } else {
              compiled.push(
                <div className="col-6 col-sm-4">
                  {numberSentence.number_sentence} {answer.answer}{" "}
                  <i className="incorrectAnswer">&#x2718;</i>
                </div>
              );
            }
            log.push(answer);
          }
        }
      });
    });

    return compiled;
  };

  render() {
    return (
      <div>
        <h4>Correct: {this.props.results.score}</h4>
        <h4>Time Left: {this.props.results.time_remaining} seconds</h4>
        <br />
        <div className="row">{this.displaySentence()}</div>
        <button className="ui left floated button" onClick={this.props.goBack}>
          Back
        </button>
      </div>
    );
  }
}

export default ResultsPage;
