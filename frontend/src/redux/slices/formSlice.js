import { createSlice } from '@reduxjs/toolkit';

// Keeps track of isDirty state upon form change to show warning message i.e. prevent navigation
const formSlice = createSlice({
    name: 'form',
    initialState: {
        isDirty: false,
    },
    reducers: {
        setDirty: (state) => { state.isDirty = true },
        setClean: (state) => { state.isDirty = false },
    },
});

export const { setDirty, setClean } = formSlice.actions;
export default formSlice.reducer;
