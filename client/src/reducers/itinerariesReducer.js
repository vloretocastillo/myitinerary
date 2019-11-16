const initState = {
    itineraries : [],
    itinerary: {}
}

const itinerariesReducer = (state = initState, action) => {

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

export default itinerariesReducer