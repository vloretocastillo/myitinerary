const initState = {
    currentUser: {}
}

const authReducer = (state = initState, action) => {

    if (action.type === 'CREATE_ONE_USER') {
        return {
            ...state,
            user: action.user
        }
    }
    else return state
}

export default authReducer