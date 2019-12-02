const login = (user) => {
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
                // console.log('after converting to json the response: ', data)
                if (data.msg) console.log(data.msg)
                else if (data.token) {
                    localStorage.setItem('token', data.token)
                    dispatch({
                        type: 'LOGIN',
                        currentUser: user
                    })
                }
            })
            
            .catch(err => console.error(err)) 
    }
}



const register = (newUser) => {


    const originalPassword = newUser.password

    
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
            .then(user =>{
                // console.log('after converting to json the response: ', user)
                // if (data.msg) console.log(data.msg)
                // else if (data.token) {
                    // localStorage.setItem('token', data.token)
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        currentUser: user
                    })
                // }
            })
            
            .catch(err => console.error(err)) 
    }
}
    




module.exports = {
    login : login,
    register : register,
    getCurrentUser : getCurrentUser
}