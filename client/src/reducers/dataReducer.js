const initState = {
    cities: [],
    itineraries : [],
    itinerary: {}
}

const dataReducer = (state = initState, action) => {

    if (action.type === 'RETRIEVE_CITIES') {
        return {
            ...state,
            cities: action.cities
        }
    }

    if (action.type === 'RETRIEVE_ITINERARIES') {
        return {
            ...state,
            itineraries: action.itineraries
        }
    }

    if (action.type === 'RETRIEVE_ITINERARY') {
        return {
            ...state,
            itinerary: action.itinerary
        }
    }
    
    else return state
}

export default dataReducer