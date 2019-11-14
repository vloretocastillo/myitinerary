const initState = {
    cities: ['city1', 'city2'],
    itineraries : ['itinerary1,', 'iti2']
}

const dataReducer = (state = initState, action) => {

    if (action.type == 'RETRIEVE_CITIES') {
        return {
            ...state,
            cities: action.cities
        }
    }
    
    else return state
}

export default dataReducer