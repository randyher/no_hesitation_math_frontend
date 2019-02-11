import React from "react";
import NumberSentence from "../components/NumberSentence.js";
import FilterForm from "../components/FilterForm";

class Sheet extends React.Component {
  state = {
    start: false,
    score: 0,
    done: false,
    timeLeft: 0
  };

  renderQuestions = () => {
    this.setState({
      start: !this.state.start
    });
  };

  timeOutHandler = state => {
    delete state.timer;
    let inputs = Object.values(state);
    let newScore = 0;
    let problems = [];
    let answers = [];

    if (inputs.length === 0) {
      this.setState({
        start: false,
        done: true,
        timeLeft: 0
      });
    }

    if (inputs.length > 0) {
      inputs.forEach(numberSentence => {
        let numbers = numberSentence.split(/[\s=]+/);
        answers.push(numbers[3]);

        this.props.problems.forEach(problem => {
          let databaseNum = problem.number_sentence.split(/[\s=]+/);

          if (
            numbers[0] === databaseNum[0] &&
            numbers[1] === databaseNum[1] &&
            numbers[2] === databaseNum[2]
          ) {
            problems.push(problem);
          }
        });

        if (
          parseInt(numbers[0]) + parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "+"
        ) {
          newScore += 1;
        }

        if (
          parseInt(numbers[0]) - parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "-"
        ) {
          newScore += 1;
        }
      });
      this.setState({
        start: false,
        done: true,
        score: newScore,
        timeLeft: 0
      });

      let data = {
        score: newScore,
        time_remaining: 0,
        problems,
        answers
      };

      this.props.addGame(data);
    }
  };

  submitHandler = (e, state) => {
    e.preventDefault();
    let timeLeft = state.timer;
    delete state.timer;
    let inputs = Object.values(state);
    let newScore = 0;
    let problems = [];
    let answers = [];

    if (inputs.length === 0) {
      this.setState({
        start: false,
        done: true,
        timeLeft: timeLeft
      });
    }

    if (inputs.length > 0) {
      inputs.forEach(numberSentence => {
        let numbers = numberSentence.split(/[\s=]+/);
        answers.push(numbers[3]);

        this.props.problems.forEach(problem => {
          let databaseNum = problem.number_sentence.split(/[\s=]+/);

          if (
            numbers[0] === databaseNum[0] &&
            numbers[1] === databaseNum[1] &&
            numbers[2] === databaseNum[2]
          ) {
            problems.push(problem);
          }
        });

        if (
          parseInt(numbers[0]) + parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "+"
        ) {
          newScore += 1;
        }

        if (
          parseInt(numbers[0]) - parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "-"
        ) {
          newScore += 1;
        }
      });
      this.setState({
        start: false,
        done: true,
        score: newScore,
        timeLeft: timeLeft
      });

      let data = {
        score: newScore,
        time_remaining: timeLeft,
        problems,
        answers
      };

      this.props.addGame(data);
    }
  };

  render() {
    let questionBank = [];
    let i = 0;
    while (i < 24) {
      questionBank.push(
        this.props.numberSentences[
          Math.floor(Math.random() * this.props.numberSentences.length)
        ]
      );
      i++;
    }

    return (
      <div className="homePage">
        <br />
        <h1>No Hesitation</h1>

        {!this.state.start && !this.state.done ? (
          <div>
            <br />
            <div className="ui big message">
              <div className="header">Directions</div>
              <p className="directions">
                No Hesitation Math is a way for students to practice their math
                facts, testing them on speed and precision. When you click
                start, a one minute timer will begin and you will be expected to
                complete all of the number sentences!
              </p>

              <p className="directions">
                Under, you may pick to filter the questions in order to practice
                a specific pressure point. If nothing is selected, all possible
                questions will be launched!
              </p>
              {/* RADIO BUTTONS BELLOW */}
              <FilterForm
                additionQuestions={this.props.filterAddQuestions}
                subtractionQuestions={this.props.filterSubtractQuestions}
                halveQuestions={this.props.filterHalveQuestions}
                tensQuestions={this.props.filterTensQuestions}
                addBoolean={this.props.addBoolean}
                subBoolean={this.props.subBoolean}
                halfBoolean={this.props.halfBoolean}
                tensBoolean={this.props.tensBoolean}
              />
              {/* RADIO BUTTONS ABOVE */}
              <p className="directions">
                Hint: Press tab to quickly cycle through the questions!
              </p>
              <p>Good luck!</p>
            </div>
            <br />
            <button className="button" onClick={this.renderQuestions}>
              Start
            </button>
          </div>
        ) : this.state.start && !this.state.done ? (
          <NumberSentence
            questions={questionBank}
            submitHandler={this.submitHandler}
            timeOutHandler={this.timeOutHandler}
          />
        ) : (
          <div>
            <h1>Results</h1>
            <br />

            <h2>
              Correct: {this.state.score}/24 <br />
              Time Remaining: {this.state.timeLeft}
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default Sheet;
