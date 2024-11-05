import { useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggleTodo: (id: number) => void;
    onDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("oldest");

    const sortedTodos = [...todos].sort((a, b) => {
        // First sorting by completion status
        if (a.completed !== b.completed) { // If completion status is different
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
        <div>
            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest")
                }
                className="mb-4 p-2 border rounded"
            >
                <option value="oldest">Oldest First</option>
                <option value="newest">Newest First</option>
            </select>

            <ul className="divide-y divide-gray-200">
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggleTodo}
                        onDelete={onDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
