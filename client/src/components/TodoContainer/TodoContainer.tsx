import {useEffect, useState} from 'react';
import FilterButtons from '../FilterButtons';
import Todo from '../Todo';
import TodoAdder from '../TodoAdder';
import './TodoContainer.styles.css';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTodos(data);
    }
  };

  // @ts-ignore
  useEffect(() => {
    const fetchData = async () => await getTodos();
    fetchData();
  }, []);

  if (!todos.length) {
    return (
      <header className="todolist">
        <h1 className="todolist__header">What's happening today?</h1>
        <TodoAdder getTodos={getTodos} />
        <h4 className="todo__empty">No todos, start adding some above</h4>
      </header>
    );
  }

  return (
    <>
      <header className="todolist">
        <h1 className="todolist__header">What's happening today?</h1>
        <TodoAdder getTodos={getTodos} />
        <FilterButtons todos={todos} setTodos={setTodos} />
      </header>
      <section className="todoList__container">
        {todos.map(todo => (
          <Todo todo={todo} getTodos={getTodos} />
        ))}
      </section>
    </>
  );
};

export default TodoContainer;
