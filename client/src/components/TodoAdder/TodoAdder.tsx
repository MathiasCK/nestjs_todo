import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import FormInput from './FormInput';
import './TodoAdder.styles.css';

// @ts-ignore
const TodoAdder = ({getTodos}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uuidv4(),
        text: inputValue,
        isComplete: false,
      }),
    });
    await getTodos();

    setInputValue('');
  };

  return (
    <form className="todo-adder" onSubmit={handleSubmit}>
      {/* @ts-ignore */}
      <FormInput
        type="text"
        name="add"
        value={inputValue}
        onChange={(e: any) => {
          setInputValue(e.target.value);
        }}
        label="Add a todo"
        required
      />
      <button className="todo-adder__button">Submit</button>
    </form>
  );
};

export default TodoAdder;
