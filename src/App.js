import React, { Component } from "react";
import TodayList from "./Components/TodayList";
import FutureList from "./Components/FutureList";
import CreateTaskForm from "./Components/CreateTaskForm";
import moment from "moment";
import tasksStore from "./Stores/TasksStore";
import { MDBContainer } from "mdbreact";

class App extends Component {
  componentDidMount() {
    tasksStore.retrieveFromLocalStorage();
  }
  render() {
    return (
      <MDBContainer>
        <CreateTaskForm />
        <TodayList />
        <FutureList />
      </MDBContainer>
    );
  }
}

export default App;
