import {createSlice} from "@reduxjs/toolkit"

const collapseStore = createSlice({
    name: 'collapse',
    initialState: {
        flag: false
    },
    reducers: {
        toggleCollapse(state, action){
            state.flag = action.payload;
        }
    }
})

const {toggleCollapse} = collapseStore.actions;
const collapseReducer = collapseStore.reducer;

export {toggleCollapse}
export default collapseReducer

