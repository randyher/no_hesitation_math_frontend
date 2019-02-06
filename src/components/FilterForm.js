import React from "react";

class FilterForm extends React.Component {
  state = {
    addition: false,
    subtraction: false
  };

  render() {
    console.log(this.props.addBoolean);
    return (
      <div>
        <form>
          <label>
            Addition Only&nbsp;
            <input
              name="isGoing"
              type="checkbox"
              value={this.state.addition}
              onChange={this.props.additionQuestions}
              disabled={this.props.subBoolean}
            />
          </label>

          <label>
            &nbsp; Subtraction Only&nbsp;
            <input
              name="isGoing"
              type="checkbox"
              onChange={this.props.subtractionQuestions}
              disabled={this.props.addBoolean}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default FilterForm;
