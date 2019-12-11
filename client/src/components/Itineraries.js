import React from 'react';
import { connect } from 'react-redux'
import { retrieveItineraries, removeFavorite, addFavorite, retrieveFavoriteItineraries } from '../actions/itinerariesActions'
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

    shouldComponentUpdate(nextProps) {
        if (this.props.currentUser === nextProps.currentUser && this.props.currentUser._id && this.props.favorites.length === 0) {
            this.props.retrieveFavoriteItineraries(this.props.currentUser.favorites)
        } 
        return true
    }

    
 

    componentWillUnmount(){ this.props.resetCurrentCity() }

    handleClickDisplayDetails = (e) => {
        let currentItinerary = this.props.itineraries.find((el) => el._id === e.target.id)
        if (currentItinerary) this.setState({ currentItinerary })
    }

    removeItineraryFromFavoritesList = (userId, itineraryId) => {
        this.props.removeFavorite(userId, itineraryId)
        
    }

    addItineraryToFavoritesList = (userId, itineraryId) => {
        this.props.addFavorite(userId, itineraryId)
            
    }

    handleClickHideDetails = () => { this.setState({ currentItinerary : {} }) }

    generateItinerariesList = () => {
        
        return this.props.itineraries.map((el) => {

            return <Itinerary parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
            
        })
    }

    generateItinerariesListIfUser = () => {
        return this.props.itineraries.map((el) => {
            if (this.props.currentUser.favorites.indexOf(el._id) != -1 ) return <Itinerary userId={this.props.currentUser._id } removeItineraryFromFavoritesList={ this.removeItineraryFromFavoritesList } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
            else return <Itinerary userId={this.props.currentUser._id } addItineraryToFavoritesList={ this.addItineraryToFavoritesList } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
        })
    }

    generateItinerariesListIfUserFavoritesChanged = () => {
        return this.props.itineraries.map((el) => {
            if (this.props.favorites.indexOf(el._id) != -1 ) return <Itinerary userId={this.props.currentUser._id } removeItineraryFromFavoritesList={ this.removeItineraryFromFavoritesList } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
            else return <Itinerary userId={this.props.currentUser._id } addItineraryToFavoritesList={ this.addItineraryToFavoritesList } parent={'itineraries'} key={el._id} generateHashtagList={this.generateHashtagList} element={el} handleClickDisplayDetails={this.handleClickDisplayDetails}></Itinerary>
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
        let doesTheCurrentUserHaveFavorites = this.props.favorites.length > 0 ? true : false
        let hasTheFavoritesArrayChanged = isThereACurrentUser && this.props.currentUser.favorites.length !== this.props.favorites.length

        let listOfItineraries;
        if (hasTheFavoritesArrayChanged) {
            listOfItineraries = this.generateItinerariesListIfUserFavoritesChanged()
        }
        else if (isThereACurrentUser) {
            listOfItineraries = this.generateItinerariesListIfUser()
        } else {
            listOfItineraries = this.generateItinerariesList()
        }

        let mainContent;
        if (Object.getOwnPropertyNames(this.state.currentItinerary).length === 0) {
            
            mainContent = (
                <div>
                    {/* <p>Available MYtineraries:</p> */}
                    <ul>
                        { listOfItineraries.length > 0 ? listOfItineraries : 'NO MyTINERARIES FOR THIS CITY AT THE MOMENT'}
                        {/* { isThereACurrentUser && doesTheCurrentUserHaveFavorites ?  this.generateItinerariesListIfUser() : this.generateItinerariesList() } */}
                        {/* { this.props.favorites.length > 0 ?  this.generateItinerariesListIfUser() : this.generateItinerariesList() } */}
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
        favorites: state.itinerariesData.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveFavoriteItineraries: (ids) => dispatch(retrieveFavoriteItineraries(ids)),
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