const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

/* ---------- READ ---------- */
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <div class="actions">
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

/* ---------- CREATE ---------- */
function addTodo() {
  todos.push(todoInput.value.trim());
  todoInput.value = "";
  addBtn.disabled = true;
  renderTodos();
}

/* ---------- UPDATE ---------- */
function editTodo(index) {
  const updatedTodo = prompt("Edit your task:", todos[index]);
  if (updatedTodo && updatedTodo.trim() !== "") {
    todos[index] = updatedTodo.trim();
    renderTodos();
  }
}

/* ---------- DELETE ---------- */
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

/* ---------- INPUT VALIDATION ---------- */
todoInput.addEventListener("input", () => {
  addBtn.disabled = todoInput.value.trim() === "";
});

addBtn.addEventListener("click", addTodo);

/* ---------- INITIAL LOAD ---------- */
renderTodos();
