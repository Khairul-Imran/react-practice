import { useState } from "react";

interface TodoFormProps {
    onAddTodo: (text: string, description: string) => void; // Add todo doesn't return anything
}

function TodoForm({ onAddTodo }: TodoFormProps) {
    // State management
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [isAddingDescription, setIsAddingDescription] = useState(false);
    // State for validation errors
    const [errors, setErrors] = useState({ text: "", description: "" });

    // Validation logic for a single field
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "text":
                if (!value.trim()) {
                    // If field is empty
                    return "Todo text is required.";
                }
                if (value.trim().length < 3) {
                    // If text field has less than 3 characters
                    return "Todo text must be at least 3 characters.";
                }
                if (value.trim().length > 50) {
                    // If text field exceeds 50 characters
                    return "Todo text cannot exceed 50 characters.";
                }
                return "";

            case "description":
                if (value.trim().length > 200) {
                    // If description field exceeds 200 characters
                    return "Todo description cannot exceed 200 characters.";
                }
                return "";

            default:
                return "";
        }
    };

    // Handling form input changes with validation
    // Note that since we call the setText() and setDescription() here, we can change the onChange value in our return statement
    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        // Update the values
        if (name === "text") {
            setText(value);
        } else if (name === "description") {
            setDescription(value);
        }

        // Validate and update errors
        // Clarify what this means....
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    }

    // Form submission handling, with validation added
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Is it necessary for us to put the "React." before FormEvent? We didn't have that earlier.
        e.preventDefault();

        // Validate all fields before submission
        const textError = validateField("text", text);
        const descriptionError = validateField("description", description);

        setErrors({
            text: textError,
            description: descriptionError,
        });

        // Only submit if no errors
        // Don't add empty todos
        if (text.trim() && !textError && !descriptionError) {
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
            <div className="w-1/2 relative mb-6">
                {/* Container for input and add description button */}
                <input
                    type="text"
                    name="text" // New for validation
                    value={text}
                    // onChange={(e) => setText(e.target.value)}
                    onChange={handleInputChange}
                    placeholder="Add a new todo.."
                    // className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600
                        ${
                            errors.text
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                />
                {errors.text && (
                    <p className="absolute -bottom-6 left-0 text-sm text-red-500">
                        {errors.text}
                    </p>
                )}
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
                <div className="w-1/2">
                    <textarea
                        name="description" // New for validation
                        value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        onChange={handleInputChange}
                        placeholder="Add some description..."
                        rows={4}
                        // className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2
                            ${
                                errors.description
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                    />

                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description}
                        </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                        {description.length}/200 characters
                    </p>
                </div>
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
