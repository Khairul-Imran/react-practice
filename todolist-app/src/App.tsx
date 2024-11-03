import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

function App() {
    // State lives in the parent
    const [todos, setTodos] = useState<Todo[]>([]);

    // Callback function defined in parent
    const addTodo = (text: string) => {
      setTodos([...todos, {
        id: Date.now(),
        text,
        completed: false
      }]);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Counter App
                </h1>
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"></div>
                <TodoHeader></TodoHeader>
                <TodoForm onAddTodo={addTodo}></TodoForm>
                <TodoList todos={todos}></TodoList>
            </div>
        </div>
    );
}

export default App;
