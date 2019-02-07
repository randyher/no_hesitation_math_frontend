import React from "react";

class ResultsPage extends React.Component {
  state = {
    feedback: []
  };

  displaySentence = () => {
    let compiled = [];
    let feedback = [];
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
                  {numberSentence.number_sentence} {answer.answer}
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

  displayFeedback = () => {
    let compiled = [];
    let feedback = [];
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
              if (numberSentence.problem_type.split(" ").length === 1) {
                feedback.push(
                  numberSentence.problem_type.split(" ")[0] + " Facts"
                );
              } else {
                feedback.push(
                  numberSentence.problem_type.split(" ")[1] + " Facts"
                );
              }
            }
          }
        }
      });
    });

    console.log(filteredAnswers.length);
    if (filteredAnswers.length !== 24) {
      feedback.unshift("Finishing problems");
    }

    if (this.props.results.time_remaining === 0) {
      feedback.unshift("Timing");
    }

    console.log(feedback);
    let output = [];
    let unique = [...new Set(feedback)];
    unique.forEach(elem => {
      output.push(<li>{elem}</li>);
    });
    console.log(unique);

    return output;
  };

  render() {
    return (
      <div>
        <h4>Correct: {this.props.results.score}</h4>
        <h4>Time Left: {this.props.results.time_remaining} seconds</h4>
        <br />
        <div className="row">{this.displaySentence()}</div>
        <br />
        {this.props.results.score !== 24 ? (
          <div className="ui large message">
            <div className="header">Feedback</div>
            <p className="directions">
              Practice:
              {this.displayFeedback()}
            </p>
          </div>
        ) : null}
        <button className="ui left floated button" onClick={this.props.goBack}>
          Back
        </button>
      </div>
    );
  }
}

export default ResultsPage;
