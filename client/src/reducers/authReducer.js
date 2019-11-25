const initState = {
    currentUser: {}
}

const authReducer = (state = initState, action) => {

    if (action.type === 'CREATE_ONE_USER') {
        return {
            ...state,
            currentUser: action.user
        }
    }

    // if (action.type === 'LOGIN') {
    //     return {
    //         ...state,
    //         currentUser: action.user
    //     }
    // }
    
    else return state
}

export default authReducer