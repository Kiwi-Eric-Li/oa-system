import {configureStore} from '@reduxjs/toolkit'
import collapseReducer from './modules/collapseReducer'
import departmentReducer from './modules/departmentReducer';

const store = configureStore({
    reducer: {
        collapse: collapseReducer,
        department: departmentReducer
    }
})

export default store;


