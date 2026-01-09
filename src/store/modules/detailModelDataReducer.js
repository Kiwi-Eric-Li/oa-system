import {createSlice} from '@reduxjs/toolkit'

const detailModelDataStore = createSlice({
    name: "detailModelData",
    initialState: {
        data: {}
    },
    reducers: {
        setDetailModelData(state, action){
            state.data = action.payload
        }
    }
})

const {setDetailModelData} = detailModelDataStore.actions;
const detailModelDataReducer = detailModelDataStore.reducer;

export {setDetailModelData}
export default detailModelDataReducer




