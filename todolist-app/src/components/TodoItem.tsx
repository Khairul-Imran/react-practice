import { useState } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onEdit: (id: number, text: string, description: string) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);
    const [editedDescription, setEditedDescription] = useState(
        todo.description
    );

    const handleSubmit = () => {
        if (editedText.trim()) {
            onEdit(todo.id, editedText, editedDescription);
            setIsEditing(false); // After done ediiting, set it back to not editing
        }
    };

    return (
        <li className="flex flex-col p-6">
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />

                {/* Uses isEditing state to toggle between view and edit mode */}
                <div className="flex-1 flex flex-col gap-2">
                    {isEditing ? (

                        // Edit mode
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="px-2 py-1 border rounded"
                            />
                            <textarea
                                value={editedDescription}
                                onChange={(e) =>
                                    setEditedDescription(e.target.value)
                                }
                                className="px-2 py-1 border rounded w-full text-sm"
                                rows={3}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedText(todo.text);
                                        setEditedDescription(todo.description);
                                    }}
                                    className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (

                        // View mode
                        <>
                            <span
                                className={
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : ""
                                }
                            >
                                {todo.text}
                            </span>
                            {todo.description && (
                                <p
                                    className={`text-sm text-gray-600 bg-gray-50 p-2 rounded-md 
                                    border border-gray-200 whitespace-pre-wrap text-left 
                                    ${
                                        todo.completed
                                            ? "line-through text-gray-500"
                                            : ""
                                    }`}
                                >
                                    {todo.description}
                                </p>
                            )}
                        </>
                    )}
                </div>

                <div className="flex gap-2">
                    {/* Edit button not showing if in editing mode */}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 
                                    hover:bg-blue-100 rounded focus:outline-none focus:ring-2 
                                    focus:ring-blue-500"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(todo.id)}
                        className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 
                                hover:bg-red-100 rounded focus:outline-none focus:ring-2 
                                focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
}

export default TodoItem;
