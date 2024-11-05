import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {

    return (
        <li className="flex flex-col p-3 border-b items-center">
            <div className="w-1/3 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex-1 flex flex-col gap-2"> 
                {/* Added container for text and description */}
                    <span
                        className={`${
                            todo.completed ? "line-through text-gray-500" : ""
                        }`}
                    >
                        {todo.text}
                    </span>
                    {todo.description && (
                        <p
                            className={`text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-200 whitespace-pre-wrap text-left ${
                                todo.completed
                                    ? "line-through text-gray-500"
                                    : ""
                            }`}
                        >
                            {todo.description}
                        </p>
                    )}
                </div>

                <button
                    className="px-2 py-1 text-sm text-red-600 hover:text-red-800 
                    hover:bg-red-100 rounded focus:outline-none focus:ring-2 
                    focus:ring-red-500"
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
