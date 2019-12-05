// module.exports = {


    const retrieveFavoriteItineraries = (ids) => {
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
                    // console.log('data:', data)
                    dispatch({
                        type: 'SET_FAVORITES',
                        favorites: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    }


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

    const addFavorite = (id, itineraryId) => {
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
                    // console.log('data:', data)
                    dispatch({
                        type: 'SET_FAVORITES',
                        favorites: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    }

    const removeFavorite = (id, itineraryId) => {
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
                    // console.log('data after removal in removeFavorite:', data)

                    // the problem here is that we are setting the data to be an array of string IDS!!!!!!!!!!!
                    // instead, we should call a dispatch(retrieveFavoriteItineraries(data))
                    // dispatch({
                    //     type: 'SET_FAVORITES',
                    //     favorites: data
                    // })
                    // lets try
                    dispatch(retrieveFavoriteItineraries(data))

                })
                .catch(err => console.error(err)) 
        }
    }


// }

module.exports = {
    retrieveFavoriteItineraries : retrieveFavoriteItineraries,
    retrieveItineraries : retrieveItineraries,
    retrieveItinerary : retrieveItinerary,
    addFavorite : addFavorite,
    removeFavorite : removeFavorite

}