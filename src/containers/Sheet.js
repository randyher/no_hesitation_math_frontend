import React from "react";
import NumberSentence from "../components/NumberSentence.js";

class Sheet extends React.Component {
  state = {
    start: false,
    score: 0,
    questions: ["1 + 1 =", "5 + 5 =", "2 + 8 ="],
    done: false
  };

  renderQuestions = () => {
    this.setState({
      start: !this.state.start
    });
  };

  submitHandler = (e, state) => {
    e.preventDefault();
    let inputs = Object.values(state);
    let newScore = 0;

    if (numbers === undefined) {
      this.setState({
        start: false,
        done: true
      });
      return null;
    }

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
      score: newScore
    });
    console.log(this.state.score);
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
        <h1>No Hesitation</h1>

        {!this.state.start && !this.state.done ? (
          <div>
            <p>
              No Hesitation Math is a way for students to paractice their math
              facts, testing them on speed and precision. When you click start,
              a one minute timer will begin and you will be expect to complete
              all the math facts!
            </p>
            <button className="button" onClick={this.renderQuestions}>
              Start
            </button>
          </div>
        ) : this.state.start && !this.state.done ? (
          <NumberSentence
            questions={questionBank}
            submitHandler={this.submitHandler}
          />
        ) : (
          <h2>Correct: {this.state.score} </h2>
        )}
      </div>
    );
  }
}

export default Sheet;
