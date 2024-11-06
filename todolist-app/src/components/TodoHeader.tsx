import { Todo } from "../types/todo";

interface TodoHeaderProps {
    todos: Todo[];
}

function TodoHeader({ todos }: TodoHeaderProps) {
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTodosCount = todos.length;

    return (
        <div className="flex justify-center w-full">
            <header className="w-1/2 flex flex-col items-center bg-white shadow-sm px-6 py-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Todo List
                </h1>

                <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <span>Total tasks: {totalTodosCount}</span>
                        <span className="w-px h-4 bg-gray-300" />{" "}
                        {/* Vertical divider */}
                        <span>Completed: {completedCount}</span>
                        <span className="w-px h-4 bg-gray-300" />
                        <span>
                            Remaining: {totalTodosCount - completedCount}
                        </span>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default TodoHeader;
