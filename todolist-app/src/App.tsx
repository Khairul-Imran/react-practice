import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

function App() {

    // State lives in the parent
    // Initialise state from localStorage or default to empty array
    const [todos, setTodos] = useState<Todo[]>(() => {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Callback function defined in parent
    const addTodo = (text: string) => {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                completed: false,
            },
        ]);
    };

    // TODO: To revise these concepts to better understand.
    // Functions/common methods
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // To save todos in localStorage whenever todolist changes
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <TodoHeader todos={todos}></TodoHeader>
            <TodoForm onAddTodo={addTodo}></TodoForm>
            <TodoList
                todos={todos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
            ></TodoList>
        </div>
    );
}

export default App;
