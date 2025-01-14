import { decorate, observable } from "mobx";
import moment from "moment";

class TasksStore {
  idCounter = 3;
  pendingTasks = [
    {
      title: "Eat a banana",
      details: "Find a banana. Eat it.",
      due: moment(),
      id: 1,
      labels: [
        {
          value: "Monkey Stuff",
          label: "Monkey Stuff"
        },
        {
          value: "Banana",
          label: "Banana"
        }
      ]
    },
    {
      title: "Tell The Monkey to get off his monkey butt and do something.",
      details: "",
      due: moment(),
      id: 2,
      labels: [
        {
          value: "Monkey Stuff",
          label: "Monkey Stuff"
        },
        {
          value: "Banana",
          label: "Banana"
        }
      ]
    }
  ];
  todayTasks = [];
  doneTasks = [];
  futureTasks = [];
  labelOptions = ["Personal", "Work", "Monkey Stuff"];

  updateLocalStorage = () => {
    // This next line will stringify the tasks list
    let tasks = JSON.stringify({
      pendingTasks: this.pendingTasks,
      todayTasks: this.todayTasks,
      futureTasks: this.futureTasks,
      done: this.doneTasks,
      idCounter: this.idCounter,
      labels: this.labelOptions
    });
    localStorage.setItem("tasks", tasks);
  };
  retrieveFromLocalStorage = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      // The following iterations converts a stringified due date to a moment object.
      tasks.pendingTasks.forEach(task => {
        if (task.due) task.due = moment(task.due);
      });
      tasks.todayTasks.forEach(task => {
        if (task.due) task.due = moment(task.due);
      });
      tasks.futureTasks.forEach(task => {
        if (task.due) task.due = moment(task.due);
      });
      this.pendingTasks = tasks.pendingTasks;
      this.todayTasks = tasks.todayTasks;
      this.futureTasks = tasks.futureTasks;
      this.doneTasks = tasks.done;
      this.idCounter = tasks.idCounter;
      this.labelOptions = tasks.labels;
    }
  };

  addTask = (title, details, due, labels) => {
    let newTask = {
      title: title,
      details: details,
      due: due,
      labels: labels,
      id: this.idCounter
    };
    this.idCounter++;
    this.pendingTasks.push(newTask);
    if (due && due.isAfter(moment(), "day")) {
      let tasks = this.futureTasks;
      tasks.push(newTask);
      this.futureTasks = tasks;
    } else {
      let tasks = this.todayTasks;
      tasks.push(newTask);
      this.todayTasks = tasks;
    }
    this.updateLocalStorage();
  };
  checkTask = taskId => {
    // Find/Get task
    let task = this.pendingTasks.find(item => item.id === taskId);

    // Remove task from pending, today, and future tasks.
    this.pendingTasks = this.pendingTasks.filter(item => item.id !== taskId);
    this.todayTasks = this.todayTasks.filter(item => item.id !== taskId);
    this.futureTasks = this.futureTasks.filter(item => item.id !== taskId);

    // Add task to done tasks.
    this.doneTasks.push(task);

    // Update local storage.
    this.updateLocalStorage();
  };

  deleteTask = taskId => {
    // Remove task from today and future tasks.
    this.todayTasks = this.todayTasks.filter(item => item.id !== taskId);
    this.futureTasks = this.futureTasks.filter(item => item.id !== taskId);
    this.pendingTasks = this.pendingTasks.filter(item => item.id !== taskId);

    // Update local storage.
    this.updateLocalStorage();
  };
}
decorate(TasksStore, {
  todayTasks: observable,
  futureTasks: observable
});

const tasksStore = new TasksStore();

export default tasksStore;
