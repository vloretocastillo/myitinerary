import React from 'react';
import { connect } from 'react-redux'
// import { retrieveItineraries } from '../actions/itinerariesActions'
// import '../css/Itineraries.css';
// import profileAvatar from '../assets/black-avatarr.png'
// import Itinerary from './Itinerary'
// import Carousel from './Carousel'
// import Button from 'react-bootstrap/Button'
// import { retrieveOneCityByName } from '../actions/dataActions'

class Favorites extends React.Component {
   
    state = {
        
    }
    

    render() {
        

        
        return (
            <div className="main-container">
                Favs
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // itineraries: state.itinerariesData.itineraries,
        // city: state.citiesData.city
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         retrieveItineraries: (queryString) => dispatch(retrieveItineraries(queryString)),
//         retrieveOneCityByName: (id) => dispatch(retrieveOneCityByName(id)),
//         resetCurrentCity : () => dispatch({ type: 'RESET_CURRENT_CITY'})
//     }
// }


export default connect(mapStateToProps)(Favorites);



