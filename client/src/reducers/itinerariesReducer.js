const initState = {
    itineraries : [],
    itinerary: {},
    favorites: []
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

    if (action.type === 'SET_FAVORITES') {
        return {
            ...state,
            favorites: action.favorites
        }
    }

   
    
    else return state
}

export default itinerariesReducer