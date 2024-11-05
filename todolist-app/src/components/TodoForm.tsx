import { FormEvent, useState } from "react";

interface TodoFormProps {
    onAddTodo: (text: string, description: string) => void;
}

// What does this method signature mean ah?
function TodoForm({ onAddTodo }: TodoFormProps) {
    // State management
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");

    // Form handling
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Don't add empty todos
        if (text.trim()) {
            onAddTodo(text.trim(), description.trim());
            setText(""); // Clears the input after adding todo
            setDescription("");
        }

        // if (description.trim()) {
        //     onAddTodo(description.trim());
        //     setDescription("");
        // }

    }

    return (
        <form onSubmit={handleSubmit} className="space-x-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo.."
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some description..."
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;
