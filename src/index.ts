interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

let tasks: Task[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => {
      toggleTaskCompletion(task.id);
    });
    li.appendChild(checkbox);
    const taskName = document.createElement("span");
    taskName.className = "task";
    taskName.textContent = task.name;
    if (task.isCompleted) {
      taskName.style.textDecoration = "line-through";
    }
    li.appendChild(taskName);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName.length === 0) {
    return;
  }
  const newTask: Task = {
    id: Date.now(),
    name: taskName,
    isCompleted: false,
  };
  tasks.push(newTask);
  renderTasks();
  taskInput.value = "";
  
}

function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTaskCompletion(id: number) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
  renderTasks();
}
taskInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});
addButton.addEventListener("click", addTask);
