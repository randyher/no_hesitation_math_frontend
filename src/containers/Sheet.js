import React from "react";
import NumberSentence from "../components/NumberSentence.js";

class Sheet extends React.Component {
  state = {
    start: false,
    score: 0,
    questions: [
      "2 + 8 =",
      "3 + 9 =",
      "3 + 8 =",
      "4 + 9 =",
      "5 + 5 =",
      "5 + 3 =",
      "6 + 4 =",
      "7 + 7 =",
      "7 + 6 =",
      "7 + 4 =",
      "8 + 8 =",
      "8 + 9 =",
      "9 + 6 =",
      "9 + 4 ="
    ],
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

    if (inputs.length === 0) {
      this.setState({
        start: false,
        done: true,
        timeLeft: 0
      });
    }

    if (inputs.length > 0) {
      let numbers = inputs[0].split(/[\s+=]+/);
      inputs.forEach(numberSentence => {
        let numbers = numberSentence.split(/[\s+=]+/);
        if (
          parseInt(numbers[0]) + parseInt(numbers[1]) ===
          parseInt(numbers[2])
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
    }
  };

  submitHandler = (e, state) => {
    e.preventDefault();
    let timeLeft = state.timer;
    delete state.timer;
    let inputs = Object.values(state);
    let newScore = 0;

    if (inputs.length === 0) {
      this.setState({
        start: false,
        done: true,
        timeLeft: timeLeft
      });
    }

    if (inputs.length > 0) {
      let numbers = inputs[0].split(/[\s+=]+/);
      inputs.forEach(numberSentence => {
        let numbers = numberSentence.split(/[\s+=]+/);
        if (
          parseInt(numbers[0]) + parseInt(numbers[1]) ===
          parseInt(numbers[2])
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
    }
  };

  render() {
    let questionBank = [];
    let i = 0;
    while (i < 24) {
      questionBank.push(
        this.state.questions[
          Math.floor(Math.random() * this.state.questions.length)
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
            <div>
              <p className="info">
                No Hesitation Math is a way for students to paractice their math
                facts, testing them on speed and precision. When you click
                start, a one minute timer will begin and you will be expect to
                complete all of the number sentences!
              </p>
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
          <h2>
            Correct: {this.state.score}/24 <br />
            Time Left: {this.state.timeLeft}
          </h2>
        )}
      </div>
    );
  }
}

export default Sheet;
