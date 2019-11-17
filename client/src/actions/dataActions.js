module.exports = {


    retrieveCities : () => {
        return async (dispatch) => {
            return await fetch(`http://localhost:5000/api/cities/all`, {
                    method: 'GET',
                })
                .then(res =>  res.json() )
                .then(data =>{
                    dispatch({
                        type: 'RETRIEVE_CITIES',
                        cities: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },



    retrieveSampleCities : () => {
        return async (dispatch) => {
            return await fetch(`http://localhost:5000/api/cities/all`, {
                    method: 'GET',
                })
                .then(res =>  res.json() )
                .then(data =>{
                    dispatch({
                        type: 'RETRIEVE_CITIES',
                        cities: data.slice(0,4)
                    })
                })
                .catch(err => console.error(err)) 
        }
    },


    retrieveItineraries : (queryString) => {

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
    },

    retrieveItinerary : (itineraryId) => {
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


}

