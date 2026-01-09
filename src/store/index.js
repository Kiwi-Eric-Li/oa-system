import {configureStore} from '@reduxjs/toolkit'
import collapseReducer from './modules/collapseReducer'
import departmentReducer from './modules/departmentReducer';
import showDetailModelReducer from './modules/showDetailModelReducer';
import detailModelDataReducer from './modules/detailModelDataReducer';

const store = configureStore({
    reducer: {
        collapse: collapseReducer,
        department: departmentReducer,
        showDetailModel: showDetailModelReducer,
        detailModelData: detailModelDataReducer
    }
})

export default store;


