import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createJobFromReducer from './services/createJobFormSlice';

const rootReducer = combineReducers({
    createJobFrom: createJobFromReducer,
})

export default configureStore({
  reducer: rootReducer,
});