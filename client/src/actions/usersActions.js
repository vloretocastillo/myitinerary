const login = (user) => {
    // console.log('inside login user parameter:', user)
    // console.log('about to post to api/users/login')
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
                // console.log('got the response adter loggin in succesfully')
                return res.json()
            })
            
            .then(data =>{
                // console.log('after converting to json: ', data)
                if (data.msg) console.log(data.msg)
                else if (data.token) {
                    // console.log('from login this is the response data.token to be dispacthed : ', data.token)
                    dispatch({
                        type: 'LOGIN',
                        token: data.token
                    })
                }
            })
            // .then(()=>{
            //     console.log('after dispatching LOGIN and hopefully having changed the state token')
            // })
            .catch(err => console.error(err)) 
    }
}



const register = (newUser) => {

    // console.log('inside register:', newUser)

    const originalPassword = newUser.password

    // console.log('original password:', originalPassword)
    
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
                    // console.log('user obj before dispatching to login:', user)
                    dispatch(login(user))
                }
            })
            .catch(err => console.error(err)) 
    }
}




module.exports = {
    login : login,
    register : register
}