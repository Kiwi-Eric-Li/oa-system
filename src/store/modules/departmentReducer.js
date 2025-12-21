import {createSlice} from '@reduxjs/toolkit'

const departmentStore = createSlice({
    name: "department",
    initialState: {
        data: []
    },
    reducers: {
        setDepartment(state, action){
            state.data = action.payload
        }
    }
})

const {setDepartment} = departmentStore.actions;
const departmentReducer = departmentStore.reducer;

export {setDepartment}
export default departmentReducer




