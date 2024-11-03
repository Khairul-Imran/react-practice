import { Todo } from "../types/todo";

interface TodoListProps {
    todos: Todo[],
    onToggleTodo: (id: number) => void;
    onDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {


    return (
        <div>
            
        </div>
    );
}

export default TodoList;