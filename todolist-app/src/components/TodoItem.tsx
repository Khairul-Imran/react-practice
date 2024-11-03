import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo,
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {


    return (
        <div>
            
        </div>
    );
}

export default TodoItem;