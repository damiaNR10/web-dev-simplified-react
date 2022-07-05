export default function Todo({ todo, toggleTodo }) {
    const handleTodoClick = () => {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input onChange = {handleTodoClick} type="checkbox" checked={todo.complete} />
                {todo.name}
            </label>
        </div>
    );
}