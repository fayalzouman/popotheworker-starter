import React, { Component } from "react";

class Task extends Component {
  render() {
    return (
      <p>
        {this.props.task.title} - {this.props.task.details}
      </p>
    );
  }
}

export default Task;
