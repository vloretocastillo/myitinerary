module.exports = {

    register : (newUser) => {

        // console.log('inside register:', newUser)
        
        return async (dispatch) => {
            return await fetch('/api/users/register', {
                    method: 'POST',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        // 'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                })
                .then(res => {
                    return res.json()
                })
                .then(data =>{
                    // console.log('data in response.json()', data)
                    dispatch({
                        type: 'REGISTER',
                        user: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },

    login : (user) => {
        // console.log('to send to fetch: ', user)
        return async (dispatch) => {
            return await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        // 'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                })
                .then(res => {
                    // res = res.json()
                    // console.log('RESPONSE from fetch: ', res)
                    return res.json()
                })
                .then(res => {
                    console.log('RESPONSE from fetch: ', res)
                })
                // .then(data =>{
                //     dispatch({
                //         type: 'LOGIN',
                //         user: data
                //     })
                // })
                .catch(err => console.error(err)) 
        }
    }
}