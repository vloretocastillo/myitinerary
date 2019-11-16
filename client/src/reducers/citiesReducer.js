const initState = {
    cities: [],
    
}

const citiesReducer = (state = initState, action) => {

    if (action.type === 'RETRIEVE_CITIES') {
        return {
            ...state,
            cities: action.cities
        }
    }

    
    
    else return state
}

export default citiesReducer