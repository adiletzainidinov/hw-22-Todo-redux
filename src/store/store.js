import { configureStore } from '@reduxjs/toolkit';
import { TodoSlice } from './slices/TodoSlices';

const store = configureStore({
  reducer: {
    todo: TodoSlice.reducer,
  },
});

export default store;
