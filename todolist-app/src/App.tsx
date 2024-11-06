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
    const addTodo = (text: string, description: string) => {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                description,
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

    const editTodo = (id: number, text: string, description: string) => {
      setTodos(todos.map(todo => 
        todo.id === id 
            ? { ...todo, text, description }
            : todo
      ));

      // ...todo: Spread operator to copy all existing properties of the todo
      // , text, description: Override the text and description with new values
      // Keeps other properties (like id and completed) unchanged

      // If the id doesn't match (false) - keep the todo exactly as it is
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
                onEditTodo={editTodo}
                onDeleteTodo={deleteTodo}
            ></TodoList>
        </div>
    );
}

export default App;
