const initState = {
    token: ''
}

const authReducer = (state = initState, action) => {

    

    if (action.type === 'LOGIN') {
        return {
            ...state,
            token: action.token
        }
    }

    if (action.type === 'LOGOUT') {
        return {
            ...state,
            token: ''
        }
    }
    
    else return state
}

export default authReducer