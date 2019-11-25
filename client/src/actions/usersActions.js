module.exports = {

    createOneUser : (newUser) => {

        // console.log(newUser)
        
        return async (dispatch) => {
            return await fetch('/api/users', {
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
                        type: 'CREATE_ONE_USER',
                        user: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },

    login : (id) => {
        return async (dispatch) => {
            return await fetch(`/api/users/${id}`, {
                    method: 'GET',
                    // body: JSON.stringify(newUser),
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    //     // 'Content-Type': 'application/json'
                    // },
                    // mode: 'no-cors'
                })
                .then(res => {
                    return res.json()
                })
                .then(data =>{
                    dispatch({
                        type: 'LOGIN',
                        user: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    }
}