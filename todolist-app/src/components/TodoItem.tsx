import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo,
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {


    return (
        <li className="flex items-center gap-2 p-3 border b">
            <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
            </span>

            <button
                className="px-2 py-1 text-sm text-red-600 hover:text-red-800 
                hover:bg-red-100 rounded focus:outline-none focus:ring-2 
                focus:ring-red-500"
                onClick={() => onDelete(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}

export default TodoItem;