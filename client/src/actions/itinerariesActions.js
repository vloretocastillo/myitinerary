

const retrieveItineraries = (queryString) => {

    const fetchPath = `http://localhost:5000/api/itineraries${queryString}`
    return async (dispatch) => {
            await fetch(fetchPath, {
            method: 'GET',
        })
        .then(res =>  res.json() )
        .then(data => {
            dispatch({
                type: 'RETRIEVE_ITINERARIES',
                itineraries: data
            })
        })
        .catch(err => console.error(err)) 
    
    }
}

const retrieveItinerary = (itineraryId) => {
    const fetchPath = `http://localhost:5000/api/itineraries/${itineraryId}`
    return async (dispatch) => { 
        await fetch(fetchPath, {
            method: 'GET',
        })
        .then(res =>  res.json() )
        .then(data => {
            dispatch({
                type: 'RETRIEVE_ITINERARY',
                itinerary: data[0]
            })
        })
        .catch(err => console.error(err)) 
    
    }
}


module.exports = {
    retrieveItineraries : retrieveItineraries,
    retrieveItinerary : retrieveItinerary,

}