const initState = {
    token: ""
}

const authReducer = (state = initState, action) => {

    // if (action.type === 'REGISTER') {
    //     return {
    //         ...state,
    //         token: action.token
    //     }
    // }

    if (action.type === 'LOGIN') {
        return {
            ...state,
            token: action.token
        }
    }
    
    else return state
}

export default authReducer