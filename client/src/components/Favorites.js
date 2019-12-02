import React from 'react';
import { connect } from 'react-redux'
import { retrieveFavoriteItineraries } from '../actions/itinerariesActions'
// import '../css/Itineraries.css';
// import profileAvatar from '../assets/black-avatarr.png'
// import Itinerary from './Itinerary'
// import Carousel from './Carousel'
// import Button from 'react-bootstrap/Button'
// import { retrieveOneCityByName } from '../actions/dataActions'

class Favorites extends React.Component {
   
    state = {
    }

    getFavorites = () => {
        this.props.retrieveFavoriteItineraries(this.props.currentUser.favorites)
            
    }
    

    render() {
        return (
            <div className="main-container">
                Favs
                <button onClick={()=> { this.getFavorites()} }>Get Favorites</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveFavoriteItineraries: (ids) => dispatch(retrieveFavoriteItineraries(ids)),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);



