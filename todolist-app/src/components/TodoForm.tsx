import { FormEvent, useState } from "react";

interface TodoFormProps {
    onAddTodo: (text: string, description: string) => void; // Add todo doesn't return anything
}

function TodoForm({ onAddTodo }: TodoFormProps) {
    // State management
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [isAddingDescription, setIsAddingDescription] = useState(false);

    // Form handling
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Don't add empty todos
        if (text.trim()) {
            onAddTodo(text.trim(), description.trim());
            setText(""); // Clears the input after adding todo
            setDescription("");
            setIsAddingDescription(false); // Set it back to false
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
        >
            <div className="w-1/2 relative"> {/* Container for input and add description button */}
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new todo.."
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {!isAddingDescription && (
                    <button
                        type="button" // Important: Add this to prevent form submission
                        onClick={() => setIsAddingDescription(true)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 
                                 px-3 py-1 text-sm text-blue-600 hover:text-blue-800
                                 border border-blue-600 hover:bg-blue-50 rounded-full
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        + Description
                    </button>
                )}
            </div>

            {isAddingDescription && (
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add some description..."
                    className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
            )}

            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md 
                         hover:bg-blue-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 font-medium"
            >
                Save Todo
            </button>
        </form>
    );
}

export default TodoForm;
