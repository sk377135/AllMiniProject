// Function to fetch and display Todos
async function fetchTodos() {
  const response = await fetch("/api/todos");
  const todos = await response.json();

  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${todo.task}</span> <button onclick="deleteTodo('${todo._id}')">Delete</button>`;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }
    todoList.appendChild(li);
  });
}

// Function to add a new Todo
async function addTodo() {
  const taskInput = document.getElementById("task");
  const task = taskInput.value.trim();

  if (task !== "") {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (response.ok) {
      taskInput.value = "";
      fetchTodos();
    }
  }
}

// Function to delete a Todo
async function deleteTodo(todoId) {
  const response = await fetch(`/api/todos/${todoId}`, { method: "DELETE" });

  if (response.ok) {
    fetchTodos();
  }
}

// Fetch Todos when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchTodos();
});
