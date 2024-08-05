import { configureStore } from '@reduxjs/toolkit';
import rosReducer from './rosReducer';

const store = configureStore({
  reducer: {
    ros: rosReducer,
  },
});

export default store;
