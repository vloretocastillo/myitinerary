import React from 'react';
// import home from '../assets/home.png';
// import { Link } from 'react-router-dom'

// import '../css/Itinerary.css';

import { connect } from 'react-redux'
import { retrieveItinerary } from '../actions/dataActions'

class Itinerary extends React.Component {
   
    state = {
        itinerary : {}
    }
  

    // fetchItinerary = async () => {
    //     const itineraryId = this.props.location.pathname.split('/').pop()
    //     const fetchPath = `http://localhost:5000/api/itineraries/${itineraryId}`
    //     const itinerary = await fetch(fetchPath, {
    //             method: 'GET',
    //         })
    //         .then(res =>  res.json() )
    //         .catch(err => console.error(err)) 
    //     return itinerary
    // }

    
    componentDidMount() {
        // this.fetchItinerary()
        const itineraryId = this.props.location.pathname.split('/').pop()
        this.props.retrieveItinerary(itineraryId)
            .then((itinerary)=>{ this.setState({ itinerary: itinerary[0] }) })
           
    }

    render() {
        
        let itinerary = this.state.itinerary

        return (
            <div className="main-container">
                {itinerary.title}
                <ul>
                    <li>{itinerary.parentCityName}</li>
                    <li>more info</li>
                </ul>
                
            </div>
        )
    }
}

// export default Itinerary;

const mapStateToProps = (state) => {
    return {
        // itinerary: state.data.itineraries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItinerary: (itineraryId) => dispatch(retrieveItinerary(itineraryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);