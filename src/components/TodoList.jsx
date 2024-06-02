import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {
  addTask,
  deleteAll,
  deleteTodo,
  setFilter,
  toggleIsCompleted,
  setInput,
} from '../store/slices/TodoSlices';

const TodoList = () => {
  const dispatch = useDispatch();
  const { input, todo, filter } = useSelector((state) => state.todo);

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask());
  };

  const filterTodo = todo.filter((item) => {
    if (filter == 'Completed') {
      return !item.isCompleted;
    }
    if (filter === 'InCompleted') {
      return item.isCompleted;
    }
    return true;
  });

  console.log(todo);
  return (
    <StyledForm onSubmit={handleAddTask}>
      <h1>Todo list</h1>
      <div>
        <input
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}
          type="text"
        />
        <button type="submit">add</button>
        <button onClick={() => dispatch(deleteAll())}>Delete All</button>
      </div>
      <StyledDiv>
        <p onClick={() => dispatch(setFilter('All'))}>All</p>
        <p onClick={() => dispatch(setFilter('Completed'))}>InComplete</p>
        <p onClick={() => dispatch(setFilter('InCompleted'))}>Completed</p>
      </StyledDiv>
      {filterTodo.map((item) => (
        <div>
          <StyledDiv
            className="bottom"
            key={item.id}
            isCompleted={item.isCompleted}
          >
            <div className="inh">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => dispatch(toggleIsCompleted(item.id))}
              />
              <h2 onClick={() => dispatch(toggleIsCompleted(item.id))}>
                {item.name}
              </h2>
            </div>
            <button type="button" onClick={() => dispatch(deleteTodo(item.id))}>
              x
            </button>
          </StyledDiv>
        </div>
      ))}
    </StyledForm>
  );
};

export default TodoList;

const StyledForm = styled.form`
  margin-top: 150px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.15);
  background-color: #90d1b3;
   h1 {
    margin-bottom: 30px;
  }
  input {
    margin-bottom: 20px;
    padding: 14px 100px 10px 10px;
    border-radius: 10px;
    border: 2px solid red;
    outline: none;
  }
  button {
    padding: 10px 25px;
    border-radius: 10px;
    border: none;
    background-color: blue;
    color: white;
    font-size: 20px;
    margin-left: 10px;
  }
  p {
    font-size: 30px;
    cursor: pointer;
  }
  .bottom {
    margin-top: 20px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  .inh {
    display: flex;
    gap: 20px;
    justify-content: center;
    h2 {
      cursor: pointer;
    }
  }
`;
