import React from 'react';


import { connect } from 'react-redux'
import { retrieveItinerary } from '../actions/dataActions'

class Itinerary extends React.Component {

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
  
    }

    render() {

        // console.log('this.props.itinerary: ', this.props.itinerary)
        
        // if (this.props.itinerary) {
            let itinerary = this.props.itinerary
            return (
                <div className="main-container">
                    <h4>{itinerary.title}</h4>
                    <ul>
                        <li>{itinerary.parentCityName}</li>
                        <li>more info</li>
                    </ul>
                    
                </div>
            )
        // } else {
        //     return <p>Loading...</p>
        // }
    }
}


const mapStateToProps = (state) => {
    return {
        itinerary: state.itinerariesData.itinerary
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItinerary: (itineraryId) => dispatch(retrieveItinerary(itineraryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);