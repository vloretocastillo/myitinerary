const initState = {
    currentUser: {},
    favorites: []
}

const authReducer = (state = initState, action) => {

    

    if (action.type === 'LOGIN') {
        return {
            ...state,
            currentUser: action.currentUser,
            favorites: action.favorites
        }
    }

    if (action.type === 'SET_CURRENT_USER') {
        return {
            ...state,
            currentUser: action.currentUser,
            favorites: action.favorites
        }
    }

    if (action.type === 'LOGOUT') {
        return {
            ...state,
            currentUser: {},
            favorites: []
        }
    }

    if (action.type === 'UPDATE_FAVORITES') {
        return {
            ...state,
            favorites: action.favorites
        }
    }
    
    else return state
}

export default authReducer