import authReducer from './authReducer'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import { combineReducers } from 'redux'



const rootReducer = combineReducers({
    auth: authReducer,
    citiesData: citiesReducer,
    itinerariesData: itinerariesReducer
})

export default rootReducer