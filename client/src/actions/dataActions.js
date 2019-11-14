module.exports = {


    retrieveCities : () => {
        return async (dispatch) => {
            return await fetch(`http://localhost:5000/api/cities/all`, {
                    method: 'GET',
                })
                .then(res =>  res.json() )
                .then(data =>{
                    dispatch({
                        type: 'RETRIEVE_CITIES',
                        cities: data
                    })
                })
                .catch(err => console.error(err)) 
        }
    },


    retrieveItineraries : (queryString) => {

        // const path = `${this.props.location.pathname + this.props.location.search}`
        // console.log(path)

        const fetchPath = `http://localhost:5000/api/itineraries${queryString}`
        return async (dispatch) => {
             await fetch(fetchPath, {
                method: 'GET',
            })
            .then(res =>  res.json() )
            .then(data => {
                dispatch({
                    type: 'RETRIEVE_ITINERARIES',
                    itineraries: data
                })
            })
            .catch(err => console.error(err)) 
        
        }
    }




}

// export function fetchArticleDetails() {
//     return function(dispatch) {
//       return axios.get("https://api.myjson.com/bins/19dtxc")
//         .then(({ data }) => {
//         dispatch(setArticleDetails(data));
//       });
//     };
//   }