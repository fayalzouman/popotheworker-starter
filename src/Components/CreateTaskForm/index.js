import React, { Component } from "react";

class CreateTaskForm extends Component {
  state = {
    title: "",
    details: ""
  };
  addTask = () => {
    if (this.state.title) {
      this.props.addTask(this.state.title, this.state.details);
      this.setState({ title: "", details: "" });
    }
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={e => {
            this.setState({ title: e.target.value });
          }}
        />
        <textarea
          placeholder="Details"
          value={this.state.details}
          onChange={e => {
            this.setState({ details: e.target.value });
          }}
        />
        <input type="submit" value="Create Task" onClick={this.addTask} />
      </div>
    );
  }
}

export default CreateTaskForm;
