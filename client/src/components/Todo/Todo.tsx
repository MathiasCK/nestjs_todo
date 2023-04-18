import {FC} from 'react';
import './Todo.styles.css';

interface Props {
  todo: any;
  editTodoHandler?: any;
  showInputField?: any;
  getTodos: any;
}

const Todo: FC<Props> = ({
  todo,

  getTodos,
}) => {
  const markTodo = async (id: any) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      });
      await getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });
      await getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article
      key={todo.id}
      className={todo.isComplete ? 'todo__finished' : 'todo'}
    >
      <section className="todo__content">
        <p className="todo__content--paragraph">{todo.text}</p>

        {todo.isComplete ? (
          <div>
            <button
              className="todo__content__button--mark"
              onClick={() => {
                markTodo(todo.id);
              }}
            >
              Undo
            </button>
            <button
              className="todo__content__button--delete"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="todo__content__button--mark"
              onClick={() => {
                markTodo(todo.id);
              }}
            >
              Complete
            </button>
            <button
              className="todo__content__button--delete"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

export default Todo;
