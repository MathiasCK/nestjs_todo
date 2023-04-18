import {FC} from 'react';

interface Props {
  setTodos: any;
  todos: any;
}

const FilterButtons: FC<Props> = ({setTodos, todos}) => {
  const filterTodos = async (filter: string) => {
    const response = await fetch(`http://localhost:8080/api/todos/${filter}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  };

  return (
    <section className="filter__buttons">
      <button onClick={() => {}}>Show all</button>
      <button
        onClick={async () => {
          const finishedTodos = await filterTodos('completed');
          console.log(finishedTodos);
          setTodos(finishedTodos);
        }}
      >
        Show completed
      </button>
      <button
        onClick={async () => {
          const finishedTodos = await filterTodos('uncompleted');
          setTodos(finishedTodos);
        }}
      >
        Show uncompleted
      </button>
    </section>
  );
};

export default FilterButtons;
