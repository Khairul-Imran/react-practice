import { Todo } from "../types/todo";
import ThemeToggle from "./ThemeToggle";

interface TodoHeaderProps {
    todos: Todo[];
}

function TodoHeader({ todos }: TodoHeaderProps) {
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTodosCount = todos.length;

    return (
        <header
            className="w-full flex flex-col items-center bg-white dark:bg-gray-800 shadow-sm px-6 py-4 mb-6 transition-colors"
        >
            <div className="w-full flex justify-end mb-2">
                <ThemeToggle />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Todo List
            </h1>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-4">
                    <span>Total tasks: {totalTodosCount}</span>
                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <span>Completed: {completedCount}</span>
                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <span>Remaining: {totalTodosCount - completedCount}</span>
                </div>
            </div>
        </header>
    );
}

export default TodoHeader;
