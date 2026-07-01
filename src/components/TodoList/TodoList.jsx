import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList({ todos, removingId, onToggle, onEdit, onRequestDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isRemoving={removingId === todo.id}
          onToggle={onToggle}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
