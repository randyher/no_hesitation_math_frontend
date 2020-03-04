import React from "react";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    grade: "2nd"
  };

  handleChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  render() {
    const errors = this.props.errors.map(error => {
      return <p style={{ color: "red" }}> {error} </p>;
    });
    return (
      <div className="signupPage">
        <br />
        <h1>Sign Up</h1>

        <br />
        {this.props.errors.length > 0 && errors}
        <br />
        <form
          className="ui form"
          onSubmit={e => this.props.handleSubmit(e, this.state)}
        >
          <div className="ui field">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="ui field">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          {/* <select
            name="grade"
            className="gradeSelect"
            onChange={this.handleChange}
          >
            <option value="1st">Grade 1</option>
            <option selected value="2nd">
              Grade 2
            </option>
          </select> */}

          <br />

          <input className="ui button" type="submit" value="Register!" />
        </form>
      </div>
    );
  }
}

export default SignUp;
