import React from 'react';
// import home from '../assets/home.png';
import { Link } from 'react-router-dom'

// import '../css/Itinerary.css';

class Itinerary extends React.Component {
   
    state = {
        itinerary : {}
    }
  

    fetchItinerary = async () => {
        const itineraryId = this.props.location.pathname.split('/').pop()
        const fetchPath = `http://localhost:5000/api/itineraries/${itineraryId}`
        const itinerary = await fetch(fetchPath, {
                method: 'GET',
            })
            .then(res =>  res.json() )
            .catch(err => console.error(err)) 
        return itinerary
    }

    
    componentDidMount() {
        this.fetchItinerary()
            .then((itinerary)=>{ this.setState({ itinerary: itinerary[0] }) })
            // .then(()=> console.log(this.state.itinerary))
           
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

export default Itinerary;