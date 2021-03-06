import React from 'react';
import { connect } from 'react-redux'
import { retrieveItineraries  } from '../actions/itinerariesActions'
import {  removeFavorite, addFavorite } from '../actions/usersActions'
import '../css/Itineraries.css';
import profileAvatar from '../assets/black-avatarr.png'
import Itinerary from './Itinerary'
import Carousel from './Carousel'
import Button from 'react-bootstrap/Button'

import { retrieveOneCityByName } from '../actions/dataActions'

class Itineraries extends React.Component {
   
    state = {
        currentItinerary: {},
    }

    componentDidMount() {

        const queryString = this.props.location.search
        const cityName = queryString.split('=').pop()
        this.props.retrieveOneCityByName(cityName)
            .then(()=> this.props.retrieveItineraries(queryString) )
            .catch(err => console.log(err))
    }

    componentWillUnmount(){ this.props.resetCurrentCity() }

    handleClickDisplayDetails = (e) => {
        let currentItinerary = this.props.itineraries.find((el) => el._id === e.target.id)
        if (currentItinerary) this.setState({ currentItinerary })
    }



    handleClickHideDetails = () => { this.setState({ currentItinerary : {} }) }

    generateItinerariesList = () => {
        return this.props.itineraries.map((el) => {
            return <Itinerary parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>        
        })
    }

    generateItinerariesListIfUser = () => {
        let favorites = this.props.favorites.map((el)=> el._id)
        return this.props.itineraries.map((el) => {
            if (favorites.indexOf(el._id) != -1 ) return <Itinerary userId={this.props.currentUser._id } removeItineraryFromFavoritesList={ this.props.removeFavorite } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
            else return <Itinerary userId={this.props.currentUser._id } addItineraryToFavoritesList={ this.props.addFavorite } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
        })
    }

   

    generateHashtagList = (hashtags) =>  hashtags.map( (hashtag, index) => <span key={index}>{ hashtag }</span> )
    

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
        let isThereACurrentUser = this.props.currentUser._id ? true : false
        let listOfItineraries = isThereACurrentUser ? this.generateItinerariesListIfUser() : this.generateItinerariesList()
        let mainContent;

        if (Object.getOwnPropertyNames(this.state.currentItinerary).length === 0) {
            mainContent = (
                <div>
                    <ul>
                        { listOfItineraries.length > 0 ? listOfItineraries : 'NO MyTINERARIES FOR THIS CITY AT THE MOMENT'}
                    </ul>
                </div>
            )
        } else {
            mainContent = this.generateExtendedItinerary()
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
        city: state.citiesData.city, 
        currentUser: state.auth.currentUser,
        favorites: state.auth.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveItineraries: (queryString) => dispatch(retrieveItineraries(queryString)),
        retrieveOneCityByName: (id) => dispatch(retrieveOneCityByName(id)),
        resetCurrentCity : () => dispatch({ type: 'RESET_CURRENT_CITY'}),
        removeFavorite: (id, itineraryId) => dispatch(removeFavorite(id, itineraryId)),
        addFavorite: (id, itineraryId) => dispatch(addFavorite(id, itineraryId)),

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