// Select DOM elements.
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Initialise the todos array.
let todos = [];

// Add event listeners.
todoForm.addEventListener('submit', handleSubmit);

// Basic form handling.
function handleSubmit(e) {
    e.preventDefault(); // Prevents form from submitting normally
    const todoText = todoInput.value.trim(); // Get input value and remove whitespace

    if (todoText) { // If there was text
        addTodo(todoText);
        todoInput.value = ''; // clear field
    }
}

function addTodo(todoText) {
    // Todo object.
    const todo = {
        id: Date.now(), // Use timestamp as the ID
        text: todoText,
        completed: false
    };

    // Add to the todos array.
    todos.push(todo);
    renderTodo(todo);
    saveTodos();
}

function renderTodo(todo) {
    // Create list item.
    const li = document.createElement('li');
    li.className = "todo-item";
    li.dataset.id = todo.id; // Store ID on element for later reference
    // dataset is a way to store custom data attributes in HTML elements
    // When this line runs, it creates an attribute like this in your HTML: <li data-id="1234567890">
    // It is used to later find the specific todo item when you want to:
    // toggle its completion status or delete it.
    
    // Create checkbox.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    // Create text span.
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    
    // Create delete button.
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    
    // Assemble todo item.
    li.append(checkbox, textSpan, deleteButton);
    todoList.prepend(li);
}

function toggleTodo(id) {
    // Finding the todo in the array.
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;

        // Update DOM to reflect the change
        const li = todoList.querySelector(`[data-id="${id}"]`);
        const textSpan = li.querySelector('span');
        if (todo.completed) {
            textSpan.classList.add('completed');
        } else {
            textSpan.classList.remove('completed');
        }

        // classList explanation
        // classList is a property that manages CSS classes on an HTML element
        // add() applies the class on the element
        // remove() removes the class off the element
        // Recall that this "completed" class was created in your css

        saveTodos();
    }
}

function deleteTodo(id) {
    // Remove todo from the array.
    todos = todos.filter(todo => todo.id !== id);

    // Remove from DOM
    const li = todoList.querySelector(`[data-id="${id}"]`);
    li.remove();

    saveTodos();
}

// Saving todos to localStorage.
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));

    // Local Storage allows you to save data in the browser
    // Persists even after you close the browser
    // Can only store strings -> stringify helps to convert to string
    // Has no expiration time
}

// Loading todos from localStorage on page load.
function loadTodos() {
    const savedTodos = localStorage.getItem('todos'); // Retrieves the string of todos from localStorage
    if (savedTodos) {
        todos = JSON.parse(savedTodos); // Converts this string of todos back into an array
        todos.forEach(todo => { // Recreates the visual elements of each todo
            renderTodo(todo);
        });
    }
}

// Initialises the app by loading saved todos.
document.addEventListener('DOMContentLoaded', loadTodos);
// It wait waits for the HTML document to be fully loaded, then runs loadTodos
// DOMContentLoaded fires only when the HTML is done loading fully