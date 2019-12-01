const initState = {
    currentUser: {}
}

const authReducer = (state = initState, action) => {

    

    if (action.type === 'LOGIN') {
        return {
            ...state,
            currentUser: action.currentUser
        }
    }

    if (action.type === 'LOGOUT') {
        return {
            ...state,
            currentUser: {}
        }
    }
    
    else return state
}

export default authReducer