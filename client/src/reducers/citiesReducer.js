const initState = {
    cities: [],
    city: {}
}

const citiesReducer = (state = initState, action) => {

    if (action.type === 'RETRIEVE_CITIES') {
        return {
            ...state,
            cities: action.cities
        }
    }

    if (action.type === 'RETRIEVE_ONE_CITY') {
        return {
            ...state,
            city: action.city
        }
    }

    
    
    else return state
}

export default citiesReducer