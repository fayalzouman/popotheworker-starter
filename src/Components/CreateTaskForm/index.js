import React, { Component } from "react";
import Datetime from "react-datetime";
import tasksStore from "../../Stores/TasksStore";
import { observer } from "mobx-react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBInput,
  MDBModalFooter
} from "mdbreact";
import Select from "react-select";
import "../../css/DatetimePicker.css";

class CreateTaskForm extends Component {
  state = {
    title: "",
    details: "",
    due: "",
    labels: [],
    modal: false
  };
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  labelSelect = (value, action) => {
    this.setState({ labels: value });
  };
  addTask = () => {
    if (this.state.title) {
      tasksStore.addTask(
        this.state.title,
        this.state.details,
        this.state.due,
        this.state.labels
      );
      this.setState({ title: "", details: "", due: "", labels: [] });
      this.toggleModal();
    }
  };
  cancelTask = () => {
    this.setState({ title: "", details: "", due: "" });
    this.toggleModal();
  };
  render() {
    let options = tasksStore.labelOptions.map(label => {
      return { value: label, label: label };
    });
    return (
      <div>
        <MDBBtn outline color="primary" onClick={this.toggleModal.bind(this)}>
          New Task
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggleModal.bind(this)}
          size="sm"
        >
          <MDBModalHeader>Add A New Task</MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              type="text"
              label="Task"
              onChange={e => this.setState({ title: e.target.value })}
              value={this.state.title}
              placeholder="Task"
            />
            <MDBInput
              type="textarea"
              label="Details (Optional)"
              onChange={e => this.setState({ details: e.target.value })}
              placeholder="Optional details"
              value={this.state.details}
            />

            <Select
              options={options}
              isMulti
              value={this.state.labels}
              onChange={this.labelSelect.bind(this)}
            />
            <Datetime
              defaultValue="Optional Due Date"
              value={this.state.due}
              onChange={momentObj => {
                this.setState({ due: momentObj });
              }}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              size="sm"
              onClick={this.cancelTask.bind(this)}
            >
              Cancel
            </MDBBtn>
            <MDBBtn color="primary" size="sm" onClick={this.addTask.bind(this)}>
              Add Task
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default observer(CreateTaskForm);
