const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".todo-filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
    todoList.innerHTML = "";
    
    let filteredTodos = todos;
    if (currentFilter === "active") {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.classList.add("todo-text");
        span.textContent = todo.text;

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("edit-input");
        input.value = todo.text;

        const button = document.createElement("button");
        button.classList.add("destroy");
        button.textContent = "❌";

        li.appendChild(span);
        li.appendChild(input);
        li.appendChild(button);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;

    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.style.display = hasCompleted ? "block" : "none";
}

todoInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const text = todoInput.value.trim();
        if (text === "") return;

        const newTodo = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveToLocalStorage();
        todoInput.value = "";
        render();
    }
});

todoList.addEventListener("click", function(e) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains("todo-text") || e.target.matches("li::before")) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveToLocalStorage();
        render();
    } else if (e.target.classList.contains("destroy")) {
        todos = todos.filter(t => t.id !== id);
        saveToLocalStorage();
        render();
    }
});

todoList.addEventListener("dblclick", function(e) {
    if (e.target.classList.contains("todo-text")) {
        const li = e.target.closest("li");
        li.classList.add("editing");
        const input = li.querySelector(".edit-input");
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    }
});

todoList.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.target.classList.contains("edit-input")) {
        const li = e.target.closest("li");
        const id = li.dataset.id;
        const value = e.target.value.trim();

        if (value === "") {
            todos = todos.filter(t => t.id !== id);
        } else {
            todos = todos.map(t => t.id === id ? { ...t, text: value } : t);
        }
        
        saveToLocalStorage();
        render();
    } else if (e.key === "Escape" && e.target.classList.contains("edit-input")) {
        const li = e.target.closest("li");
        li.classList.remove("editing");
        e.target.value = todos.find(t => t.id === li.dataset.id).text;
    }
});

todoList.addEventListener("focusout", function(e) {
    if (e.target.classList.contains("edit-input")) {
        const li = e.target.closest("li");
        if (li.classList.contains("editing")) {
            const id = li.dataset.id;
            const value = e.target.value.trim();

            if (value === "") {
                todos = todos.filter(t => t.id !== id);
            } else {
                todos = todos.map(t => t.id === id ? { ...t, text: value } : t);
            }
            saveToLocalStorage();
            render();
        }
    }
}, true);

filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        
        if (this.id === "filterAll") currentFilter = "all";
        else if (this.id === "filterActive") currentFilter = "active";
        else if (this.id === "filterCompleted") currentFilter = "completed";
        
        render();
    });
});

clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(t => !t.completed);
    saveToLocalStorage();
    render();
});

render();