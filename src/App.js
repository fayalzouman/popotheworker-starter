import React, { Component } from "react";
import TodayList from "./Components/TodayList";

class App extends Component {
  state = {
    tasks: [
      {
        title: "Eat a banana",
        details: "Find a banana. Eat it."
      },
      {
        title: "Tell The Monkey to get off his monkey butt and do something.",
        details: "Do something Popo!!!"
      },
      {
        title: "Dance.",
        details: "Daaaaaance!!!"
      }
    ]
  };
  render() {
    let tasks_list = this.state.tasks.map(task => (
      <p key={task.title}>
        {task.title} - {task.details}
      </p>
    ));
    return (
      <div className="App">
        <TodayList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
