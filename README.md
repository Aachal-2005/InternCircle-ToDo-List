# Interactive To-Do List with LocalStorage

## About the Project
TaskFlow is a browser-based task manager built with HTML, CSS and JavaScript. It helps users add tasks, mark them as completed, delete tasks and keep their task list saved after a page refresh using browser LocalStorage.

## Technologies Used
- **HTML5** – page structure and form controls.
- **CSS3** – responsive layout, styling and hover effects.
- **JavaScript** – task operations, filtering, progress summary and LocalStorage.

## Features
- Add new tasks
- Mark tasks as completed or active
- Delete individual tasks
- Filter all, active and completed tasks
- Clear all completed tasks
- Show total, remaining and completed task counts
- Show completion progress
- Save tasks in LocalStorage so they persist after refreshing the browser
- Responsive design for mobile and desktop

## How to Run
1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` with Live Server, or open it directly in a modern browser.
4. Add a task and refresh the page to test LocalStorage persistence.

## How LocalStorage Works
The application stores the task array as JSON under the key `taskflow_tasks`. When the page loads, JavaScript reads the saved array from LocalStorage. Whenever a task is added, completed, deleted or cleared, the updated array is saved again.

## Project Structure
```text
todo-list/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Author
Aachal Dane

## Internship
InternCircle – Fullstack Web Development
