import React from 'react';
import profileAvatar from '../assets/black-avatarr.png'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'


class Itinerary extends React.Component {
    

    render() {
        
        let el = this.props.element
        let button;

        if (this.props.parent == 'favorites') {
            button = <button className='btn btn-block btn-outline-danger m-2 custom-button' onClick={ () => this.props.removeItineraryFromFavoritesList(this.props.userId, el._id )}>Remove from Favorites</button>
        } else if (this.props.parent == 'itineraries') {

            if (this.props.userId) {

                if (this.props.removeItineraryFromFavoritesList) button = <button className='btn btn-block btn-outline-danger m-2 custom-button' onClick={ () => this.props.removeItineraryFromFavoritesList(this.props.userId, el._id )}>Remove from Favorites</button>
                else button = <button className='btn btn-block btn-outline-success m-2 custom-button' onClick={ () => this.props.addItineraryToFavoritesList(this.props.userId, el._id )}>Add to Favorites</button>
        
            } 
        }
        return (
            <li className='custom-li'> 
                <div className='itinerary-list-container'>

                    <div className='parentCityName'>
                            {el.parentCityName}
                    </div>
                
                    <div className='avatar-wrapper'>
                        <img  src={profileAvatar} alt='profile user photo'></img>
                    </div>
                    <div className='info-wrapper'>
                        <h5> {el.title}  </h5>
                        <div className='subdetails-container'>
                            <span>Likes: 4</span>
                            <span>{el.duration} hrs</span>
                            <span>{el.price} hrs</span>
                        </div>
                        <div className='subdetails-container'>
                            {this.props.generateHashtagList(el.hashtags)}
                        </div>
                        
                    </div>
                    <div className='link-to-details'>
                        <button className='btn btn-block btn-outline-secondary m-2'id={el._id} onClick={  (e) => this.props.handleClickDisplayDetails(e)   }>See Details</button>
                        {button}
                    </div>
                    
                </div>
            </li>
        )
       
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    }
}



export default connect(mapStateToProps)(Itinerary);