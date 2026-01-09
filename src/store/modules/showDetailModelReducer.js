import {createSlice} from '@reduxjs/toolkit'

const detailModelStore = createSlice({
    name: 'showDetailModel',
    initialState: {
        data: false
    },
    reducers: {
        toggleShowDetailModel(state, action){
            state.data = action.payload;
        }
    }
})

const {toggleShowDetailModel} = detailModelStore.actions;
const detailModelReducer = detailModelStore.reducer;

export {toggleShowDetailModel}
export default detailModelReducer