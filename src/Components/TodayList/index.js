import React, { Component } from "react";
import Task from "../Task";

class TodayList extends Component {
  render() {
    let tasks = this.props.tasks.map(task => (
      <Task task={task} key={task.title} />
    ));
    return <div>{tasks}</div>;
  }
}

export default TodayList;
