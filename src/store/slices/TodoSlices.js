import { createSlice } from '@reduxjs/toolkit';
import TodoList from '../../components/TodoList';

const initialState = {
  input: '',
  todo: [],
  filter: 'All',
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addTask: (state) => {
      const input = state.input;
      if (input !== '') {
        const newObject = {
          id: Math.random(),
          name: input,
          isCompleted: false,
        };
        state.todo.push(newObject);
        state.input = '';
      }
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.payload);
    },
    toggleIsCompleted: (state, action) => {
      state.todo = state.todo.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteAll: (state) => {
      state.todo = [];
    },
  },
});

export const {
  setInput,
  addTask,
  deleteTodo,
  toggleIsCompleted,
  setFilter,
  deleteAll,
} = TodoSlice.actions;

export default TodoSlice.reducer;
