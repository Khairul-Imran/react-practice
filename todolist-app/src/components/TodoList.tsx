import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[],
    onToggleTodo: (id: number) => void;
    onDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {

    if (todos.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No todos add yet. Add one above!
            </div>
        );
    }

    return (
        <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggleTodo}
                    onDelete={onDeleteTodo}
                />  
            ))}
        </ul>
    );
}

export default TodoList;