module.exports = {


    retrieveFavoriteItineraries : (ids) => {
        return async (dispatch) => {
            return await fetch('http://localhost:5000/api/itineraries/favorites', {
                    method: 'GET',
                    headers: { 
                        Authorization: 'Bearer ' + localStorage.token,
                        favorites: ids
                    }
                })
                .then(res =>  res.json() )
                .then(data =>{
                    console.log('data:', data)
                    dispatch({
                        type: 'SET_FAVORITES',
                        favorites: data
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
    },

    addFavorite : (id, itineraryId) => {
        return async (dispatch) => {
            return await fetch(`http://localhost:5000/api/users/addfavorite/${id}`, {
                    method: 'GET',
                    headers: { 
                        Authorization: 'Bearer ' + localStorage.token,
                        itinerary: itineraryId
                    }
                })
                .then(res =>  res.json() )
                .then(data =>{
                    console.log('data:', data)
                    dispatch({
                        type: 'SET_FAVORITES',
                        favorites: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },

    removeFavorite : (id, itineraryId) => {
        return async (dispatch) => {
            return await fetch(`http://localhost:5000/api/users/removefavorite/${id}`, {
                    method: 'GET',
                    headers: { 
                        Authorization: 'Bearer ' + localStorage.token,
                        itinerary: itineraryId
                    }
                })
                .then(res =>  res.json() )
                .then(data =>{
                    console.log('data:', data)
                    dispatch({
                        type: 'SET_FAVORITES',
                        favorites: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },


}