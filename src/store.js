import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createJobFromReducer from './services/createJobFormSlice';
import userAuthReducer from './services/userAuthSlice';

const rootReducer = combineReducers({
    createJobFrom: createJobFromReducer,
    userAuth: userAuthReducer,
})

export default configureStore({
  reducer: rootReducer,
});