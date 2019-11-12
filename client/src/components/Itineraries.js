import React from 'react';
import home from '../assets/home.png';
import { Link } from 'react-router-dom'

// import '../css/Itineraries.css';

class Itineraries extends React.Component {
   
    state = {
        itineraries : [],
    }
  

    fetchItineraries = async () => {
        const path = `${this.props.location.pathname + this.props.location.search}`
        const fetchPath = `http://localhost:5000/api${path}`
        const itineraries = await fetch(fetchPath, {
                method: 'GET',
            })
            .then(res =>  res.json() )
            .catch(err => console.error(err)) 
        return itineraries
    }

    componentDidMount() {
        this.fetchItineraries()
            .then((itineraries)=>{ this.setState({ itineraries }) })
            .then(()=>{
                if (this.state.itineraries.length > 0) {
                    this.setState({ currentCity : this.state.itineraries[0].parentCityName})
                }
            })
    }

    render() {

        let itineraries = this.state.itineraries.map((el) => {
            return (
                <li key={el._id}> 
                    {el.title} 
                    <Link to={`/itinerary/${el._id}` }>See Details</Link>
                </li>
            )
        });
        return (
            <div className="main-container">
                {this.state.currentCity}
                <ul>
                    {itineraries}
                </ul>
                
            </div>
        )
    }
}

export default Itineraries;