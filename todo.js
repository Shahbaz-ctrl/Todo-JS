// Select DOM elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Load data from local storage
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Save data to local storage
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render data from local storage
function renderData() {
    const todos = getTodos();
    todoList.innerHTML = ""; // Clear the list before rendering
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.className = todo.done ? "done" : "";
        listItem.innerHTML = `
            <span>${todo.text}</span>
            <button class="editBtn" data-index="${index}">Edit</button>
            <button class="deleteBtn" data-index="${index}">Delete</button>
            <button class="doneBtn" data-index="${index}">Done</button>
        `;
        // Disable buttons if edit mode
        if (todo.editMode) {
            listItem.innerHTML = `
                <input type="text" value="${todo.text}" class="editInput">
                <button class="saveBtn" data-index="${index}">Save</button>
            `;
        }
        todoList.appendChild(listItem);
    });
}

// Add a new to-do
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todos = getTodos();
    todos.push({ text: todoInput.value, done: false, editMode: false });
    saveTodos(todos);
    todoInput.value = ""; // Clear input
    renderData();
});

// Handle to-do list actions (edit, delete, done)
todoList.addEventListener("click", (e) => {
    const todos = getTodos();
    const index = e.target.dataset.index;

    if (e.target.classList.contains("editBtn")) {
        todos[index].editMode = true;
    } else if (e.target.classList.contains("saveBtn")) {
        const newText = e.target.previousElementSibling.value;
        todos[index].text = newText;
        todos[index].editMode = false;
    } else if (e.target.classList.contains("deleteBtn")) {
        todos.splice(index, 1);
    } else if (e.target.classList.contains("doneBtn")) {
        todos[index].done = true;
    }

    saveTodos(todos);
    renderData();
});

// Initial render
renderData();
