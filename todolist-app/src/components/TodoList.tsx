import { useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggleTodo: (id: number) => void;
    onEditTodo: (id: number, text: string, description: string) => void;
    onDeleteTodo: (id: number) => void;
}

function TodoList({
    todos,
    onToggleTodo,
    onEditTodo,
    onDeleteTodo,
}: TodoListProps) {
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("oldest");

    const sortedTodos = [...todos].sort((a, b) => {
        // First sorting by completion status
        if (a.completed !== b.completed) {
            // If completion status is different
            return a.completed ? 1 : -1; // Put completed items at the bottom
        }

        // If completion status is the same, sort by date
        return sortBy === "oldest" ? a.id - b.id : b.id - a.id;
    });

    if (todos.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No todos add yet. Add one above!
            </div>
        );
    }

    return (
        <div className="mt-8 w-full items-center flex flex-col">
            {/* Added top margin for spacing from TodoForm */}
            <div className="w-1/2 mb-4">
                {/* Right-aligned container for sort options */}
                <div className="relative inline-block">
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as "newest" | "oldest")
                        }
                        className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 
                                 rounded-md text-sm text-gray-700 hover:border-gray-400 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 focus:border-blue-500 cursor-pointer"
                    >
                        <option value="oldest">Sort: Oldest First</option>
                        <option value="newest">Sort: Newest First</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>
            <ul className="w-1/2 divide-y divide-gray-200 bg-white rounded-lg shadow">
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggleTodo}
                        onEdit={onEditTodo}
                        onDelete={onDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
