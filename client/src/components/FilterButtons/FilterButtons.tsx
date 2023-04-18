import {FC} from 'react';

interface Props {
  setTodos: any;
  todos: any[];
  initialTodos: any[];
}

const FilterButtons: FC<Props> = ({setTodos, todos, initialTodos}) => {
  const filterTodos = (filter: boolean) => {
    setTodos(initialTodos.filter(todo => todo.isComplete === filter));
  };

  return (
    <section className="filter__buttons">
      <button
        onClick={async () => {
          setTodos(initialTodos);
        }}
      >
        Show all
      </button>
      <button
        onClick={() => {
          filterTodos(true);
        }}
      >
        Show completed
      </button>
      <button
        onClick={() => {
          filterTodos(false);
        }}
      >
        Show uncompleted
      </button>
    </section>
  );
};

export default FilterButtons;
