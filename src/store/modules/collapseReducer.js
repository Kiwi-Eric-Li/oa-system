import {createSlice} from "@reduxjs/toolkit"

const collapseStore = createSlice({
    name: 'collapse',
    initialState: {
        data: false
    },
    reducers: {
        toggleCollapse(state, action){
            state.data = action.payload;
        }
    }
})

const {toggleCollapse} = collapseStore.actions;
const collapseReducer = collapseStore.reducer;

export {toggleCollapse}
export default collapseReducer

