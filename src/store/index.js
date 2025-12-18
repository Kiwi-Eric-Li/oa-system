import {configureStore} from '@reduxjs/toolkit'
import collapseReducer from './modules/collapseReducer'

const store = configureStore({
    reducer: {
        collapse: collapseReducer
    }
})

export default store;


