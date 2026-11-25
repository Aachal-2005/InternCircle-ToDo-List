const STORAGE_KEY = "taskflow_tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const clearCompletedButton = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not read saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
  tasks.unshift({
    id: Date.now(),
    text,
    done: false
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(task => !task.done);
  if (currentFilter === "completed") return tasks.filter(task => task.done);
  return tasks;
}

function renderTasks() {
  taskList.replaceChildren();
  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach(task => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as ${task.done ? "active" : "completed"}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, text, deleteButton);
    taskList.append(item);
  });

  const completed = tasks.filter(task => task.done).length;
  const active = tasks.length - completed;
  const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  totalCount.textContent = tasks.length;
  activeCount.textContent = active;
  completedCount.textContent = completed;
  progressText.textContent = `${percentage}% completed`;
  progressBar.style.width = `${percentage}%`;
  emptyMessage.hidden = visibleTasks.length > 0;
  clearCompletedButton.disabled = completed === 0;
  clearCompletedButton.style.opacity = completed === 0 ? ".45" : "1";
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskForm.reset();
  taskInput.focus();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    renderTasks();
  });
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
});

document.getElementById("today").textContent = new Intl.DateTimeFormat("en-IN", {
  weekday: "short", day: "numeric", month: "short", year: "numeric"
}).format(new Date());

renderTasks();
