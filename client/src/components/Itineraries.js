import React from 'react';
import { connect } from 'react-redux'
import { retrieveItineraries } from '../actions/itinerariesActions'
import '../css/Itineraries.css';
// import profileAvatar from '../assets/white-avatarr.jpg'
import Itinerary from './Itinerary'


import { retrieveOneCityByName } from '../actions/dataActions'

class Itineraries extends React.Component {
   
    state = {
        currentItinerary: {},
        itinerariesList : [],
    }
    componentDidMount() {
        const queryString = this.props.location.search
        const cityName = queryString.split('=').pop()
        this.props.retrieveOneCityByName(cityName)
            .then(()=> {
                this.props.retrieveItineraries(queryString)
                    .then(()=>{ this.props.itineraries.length > 0 && this.generateItinerariesList() })  
            })
            .catch(err => console.log(err))
    }

    componentWillUnmount(){ this.props.resetCurrentCity() }

    handleClickDisplayDetails = (e) => {
        let currentItinerary = this.props.itineraries.find((el) => el._id === e.target.id)
        if (currentItinerary) this.setState({ currentItinerary })
    }

    handleClickHideDetails = () => { this.setState({ currentItinerary : {} }) }

    generateItinerariesList = () => {
        let itinerariesList =  this.props.itineraries.map((el) => <Itinerary key={el._id} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>)
        this.setState({ itinerariesList })
    }

    
    
    render() {
        let mainContent;
        if (Object.getOwnPropertyNames(this.state.currentItinerary).length === 0) {
            mainContent = (
                <div>
                    <p>Available MYtineraries:</p>
                    <ul>
                        { this.state.itinerariesList }
                    </ul>
                </div>
            )
        } else {
            mainContent = (
            <div>
                { this.state.currentItinerary.title }
                <button  onClick={()=>{ this.handleClickHideDetails()} }>Back</button>
            </div>
            )
        }

        
        return (
            <div className="main-container">
                <header className='itineraries-list-header'>
                    <h2> { this.props.city.name } </h2>
                    <div className='dark-coverr'></div>
                    <img src={ this.props.city.img } alt=""/>
                </header>
                { mainContent }   
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        itineraries: state.itinerariesData.itineraries,
        city: state.citiesData.city
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItineraries: (queryString) => dispatch(retrieveItineraries(queryString)),
        retrieveOneCityByName: (id) => dispatch(retrieveOneCityByName(id)),
        resetCurrentCity : () => dispatch({ type: 'RESET_CURRENT_CITY'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);











// generateItinerariesList = () => {
    //     let itinerariesList = this.props.itineraries.map((el) => {
    //         return (
    //             <li key={el._id}> 
    //                 <div className='itinerary-list-container'>
    //                     <div className='avatar-wrapper'>
    //                         <img  src={profileAvatar} alt='profile user photo'></img>
    //                     </div>
    //                     <div className='info-wrapper'>
    //                         <h5> {el.title}  </h5>
    //                         <p>Duration: {el.duration} hrs</p>
    //                         <p>Price: {el.price} hrs</p>
    //                         <ul>
    //                             <li>{el.hashtags[0] || '' }</li>
    //                             <li>{el.hashtags[1] || '' }</li>
    //                         </ul>
    //                     </div>
    //                     <div className='link-to-details'>
    //                         <button id={el._id} onClick={  (e) => this.handleClickDisplayDetails(e)   }>See Details</button>
    //                     </div>
    //                 </div>
    //             </li>
    //         )
    //     })
    //     this.setState({ itinerariesList })
    // }