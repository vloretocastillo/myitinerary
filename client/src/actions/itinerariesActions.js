// module.exports = {


    // const retrieveFavoriteItineraries = (ids) => {
    //     // console.log('about to send the fetch to the backend with the array', ids)
    //     ///IM NOT GETTING THE EMPTY ARRAY FROM THE BACKEND!!!!!! THE PROBLEM IS WITH THE ROUTE
    //     return async (dispatch) => {
    //         return await fetch('http://localhost:5000/api/itineraries/favorites', {
    //                 method: 'GET',
    //                 headers: { 
    //                     Authorization: 'Bearer ' + localStorage.token,
    //                     favorites: ids
    //                 }
    //             })
    //             .then(res =>  res.json() )
    //             .then(data =>{
    //                 // console.log('abotu to set the new FAVORITES state with this new data:', data)
    //                 dispatch({
    //                     type: 'SET_FAVORITES',
    //                     favorites: data
    //                 })
    //             })
    //             .catch(err => console.error(err)) 
    //     }
    // }


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

    // const addFavorite = (id, itineraryId) => {
    //     return async (dispatch) => {
    //         return await fetch(`http://localhost:5000/api/users/addfavorite/${id}`, {
    //                 method: 'GET',
    //                 headers: { 
    //                     Authorization: 'Bearer ' + localStorage.token,
    //                     itinerary: itineraryId
    //                 }
    //             })
    //             .then(res =>  res.json() )
    //             .then(data =>{
    //                 // console.log('data:', data)
    //                 // dispatch({
    //                 //     type: 'SET_FAVORITES',
    //                 //     favorites: data
    //                 // })
    //                 dispatch(retrieveFavoriteItineraries(data))


    //             })
    //             .catch(err => console.error(err)) 
    //     }
    // }

    // const removeFavorite = (id, itineraryId) => {
    //     console.log('inside removeFavorite in actionsCreators about to send to removeFavorite', id, itineraryId)
    //     return async (dispatch) => {
    //         return await fetch(`http://localhost:5000/api/users/removefavorite/${id}`, {
    //                 method: 'GET',
    //                 headers: { 
    //                     Authorization: 'Bearer ' + localStorage.token,
    //                     itinerary: itineraryId
    //                 }
    //             })
    //             .then(res =>  res.json() )

    //             .then(data =>{

    //                 // console.log('data response in removeFavorite:', data)

                    
    //                 dispatch(retrieveFavoriteItineraries(data))

    //             })
    //             .catch(err => console.error(err)) 
    //     }
    // }


// }

module.exports = {
    // retrieveFavoriteItineraries : retrieveFavoriteItineraries,
    retrieveItineraries : retrieveItineraries,
    retrieveItinerary : retrieveItinerary,
    // addFavorite : addFavorite,
    // removeFavorite : removeFavorite

}