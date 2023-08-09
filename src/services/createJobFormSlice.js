/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const createJobFormSlice = createSlice({
    name: "createJobForm",
    initialState: {
        formData: null
    },
    reducers: {
        setCreateJobFromReduxState: (state, action) => {
            state.formData = action.payload.formData;
        },
        clearCreateJobFromReduxState: (state, action) => {
            state.formData = null;
            console.log(state.formData);
        }
    }
});

export const { setCreateJobFromReduxState, clearCreateJobFromReduxState } = createJobFormSlice.actions;
export default createJobFormSlice.reducer;