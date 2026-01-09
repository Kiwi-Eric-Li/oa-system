import {configureStore} from '@reduxjs/toolkit'
import collapseReducer from './modules/collapseReducer'
import departmentReducer from './modules/departmentReducer';
import showDetailModelReducer from './modules/showDetailModelReducer';

const store = configureStore({
    reducer: {
        collapse: collapseReducer,
        department: departmentReducer,
        showDetailModel: showDetailModelReducer
    }
})

export default store;


