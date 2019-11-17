import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { retrieveItineraries } from '../actions/itinerariesActions'
import '../css/Itineraries.css';
import profileAvatar from '../assets/white-avatarr.jpg'


class Itineraries extends React.Component {
   
    state = {
        currentCity: ''
    }


    componentDidMount() {
        const queryString = this.props.location.search
        this.props.retrieveItineraries(queryString)
            .then(()=>{
                if (this.props.itineraries.length > 0) this.setState({ currentCity : this.props.itineraries[0].parentCityName})
            })
    }

    render() {

        // console.log(this.props.itineraries)

        let itineraries = this.props.itineraries.map((el) => {
            return (
                <li key={el._id}> 
                    <div className='itinerary-list-container'>
                        <div className='avatar-wrapper'>
                            <img  src={profileAvatar} alt='profile user photo'></img>
                        </div>
                        <div className='info-wrapper'>
                            <h5> {el.title}  </h5>
                            <p>Duration: {el.duration} hrs</p>
                            <ul>
                                <li>{el.hashtags[0] || '' }</li>
                                <li>{el.hashtags[1] || '' }</li>
                            </ul>
                            <Link to={`/itinerary/${el._id}` }>See Details</Link>
                        </div>
                        
                    </div>
                </li>
            )
        });
        return (
            <div className="main-container">
                <header>
                    <h2> {this.state.currentCity} </h2>
                </header>
                <p>Available MYtineraries:</p>
                <ul>
                    {itineraries}
                </ul>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        itineraries: state.itinerariesData.itineraries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItineraries: (queryString) => dispatch(retrieveItineraries(queryString))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);