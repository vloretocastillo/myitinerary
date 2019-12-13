const login = (user) => {
    console.log('about to send a login to the backendwith ', user)
    return async (dispatch) => {
        return await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode: 'no-cors'
            })
            .then(res => {
                return res.json()
            })
            
            .then(data =>{
                console.log('login after converting to json the response: ', data)
                if (data.msg) console.log(data.msg)
                else if (data.token) {
                    localStorage.setItem('token', data.token)
                    dispatch({
                        type: 'LOGIN',
                        currentUser: data.user,
                        favorites: data.favorites
                    })
                }
            })
            
            .catch(err => console.error(err)) 
    }
}



const register = (newUser) => {


    const originalPassword = newUser.password

    // console.log('about to register the newUser here in usersActions', newUser)
    // console.log('about to register the newUser here in usersActions stringified', JSON.stringify(newUser))


    
    return async (dispatch) => {
        return await fetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode: 'no-cors'
            })
            .then(res => {
                return res.json()
            })
            .then(data =>{
                if (data.msg) console.log(data.msg)
                else {
                    const user = {email : data.email, password : originalPassword}
                    dispatch(login(user))
                }
            })
            .catch(err => console.error(err)) 
    }
}

const getCurrentUser = (token) => {

    return async (dispatch) => {
        return await fetch(`/api/users/currentuser?auth_token=${token}`, {
                method: 'GET',
            })
            .then(res => {
                return res.json()
            })
            .then(data =>{
               
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        currentUser: data.user,
                        favorites: data.favorites
                    })
                // }
            })
            
            .catch(err => console.error(err)) 
    }

    
}




const setFavoriteItineraries = (ids) => {
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
                dispatch({
                    type: 'UPDATE_FAVORITES',
                    favorites: data
                })
            })
            .catch(err => console.error(err)) 
    }
}

const removeFavorite = (id, itineraryId) => {
    // console.log('inside removeFavorite in actionsCreators about to send to removeFavorite', id, itineraryId)
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
                // console.log('data', data)
                // dispatch(setFavoriteItineraries(data))
                dispatch({
                    type: 'UPDATE_FAVORITES',
                    favorites: data
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
                    type: 'UPDATE_FAVORITES',
                    favorites: data
                })
                // dispatch(retrieveFavoriteItineraries(data))


            })
            .catch(err => console.error(err)) 
    }
}
    




module.exports = {
    login : login,
    register : register,
    getCurrentUser : getCurrentUser,
    removeFavorite : removeFavorite,
    addFavorite : addFavorite
}