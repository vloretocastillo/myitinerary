import React from 'react';
import { connect } from 'react-redux'
import { retrieveFavoriteItineraries } from '../actions/itinerariesActions'
// import '../css/Itineraries.css';
import profileAvatar from '../assets/black-avatarr.png'
import Itinerary from './Itinerary'
import Carousel from './Carousel'
import Button from 'react-bootstrap/Button'
// import { retrieveOneCityByName } from '../actions/dataActions'

class Favorites extends React.Component {
   
    state = {
        currentItinerary: {},
        itinerariesList : [],
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser !== prevProps.currentUser) {
            this.props.retrieveFavoriteItineraries(this.props.currentUser.favorites)
                // .then(()=> this.setState({ itinerariesList : this.props.favorites}) )
                .then( () => {this.props.favorites.length > 0 && this.generateItinerariesList() })
                .then( () => console.log('this.props.favorites: ', this.props.favorites ))
        }
    }

    componentWillUnmount(){ this.props.resetCurrentCity() }

    handleClickDisplayDetails = (e) => {
        let currentItinerary = this.props.favorites.find((el) => el._id === e.target.id)
        if (currentItinerary) this.setState({ currentItinerary })
    }

    handleClickHideDetails = () => { this.setState({ currentItinerary : {} }) }

    generateItinerariesList = () => {
        let itinerariesList =  this.props.favorites.map((el) => <Itinerary  key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>)
        this.setState({ itinerariesList })
    }

    generateHashtagList = (hashtags) => {
        return hashtags.map( (hashtag, index) => <span key={index}>{ hashtag }</span> )
    }

    generateExtendedItinerary = () => {
        return (
            <div>
                <h2>{ this.state.currentItinerary.title }</h2>
                <div className='itinerary-list-container'>
                    <div className='avatar-wrapper'>
                        <img  src={profileAvatar} alt='profile user photo'></img>
                    </div>
                    <div className='info-wrapper'>
                        
                        <div className='subdetails-container'>
                            <span>Likes: 4</span>
                            <span>{this.state.currentItinerary.duration} hrs</span>
                            <span>{this.state.currentItinerary.price} hrs</span>
                        </div>
                        <div className='subdetails-container'>
                            {this.generateHashtagList(this.state.currentItinerary.hashtags)}
                        </div>
                        
                    </div>
                    
                </div>
                <div className='carousel-container'>
                    <div>
                        <Carousel activities={this.state.currentItinerary.activities}></Carousel>
                    </div>
                </div>
                <Button className='btn-block btn-dark'  onClick={()=>{ this.handleClickHideDetails()} }>Back</Button>
            </div>
        )
    }
 
    

    render() {

        let mainContent;
        if (Object.getOwnPropertyNames(this.state.currentItinerary).length === 0) {
            mainContent = (
                <div>
                    
                    <ul>
                        { this.state.itinerariesList }
                    </ul>
                </div>
            )
        } else {
            mainContent = this.generateExtendedItinerary()
        }

        // console.log(this.state.itinerariesList)

        return (
            <div className="main-container">
                <h1>FAVORITES</h1>
                { mainContent }   
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        favorites: state.itinerariesData.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveFavoriteItineraries: (ids) => dispatch(retrieveFavoriteItineraries(ids)),
        resetCurrentCity : () => dispatch({ type: 'RESET_CURRENT_CITY'})

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);



