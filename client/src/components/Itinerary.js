import React from 'react';
import profileAvatar from '../assets/black-avatarr.png'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'





// import { removeFavorite, addFavorite } from '../actions/itinerariesActions'

class Itinerary extends React.Component {
    

    render() {
        
        let el = this.props.element
        let button;

        console.log('this.props.userId from child: ', this.props.userId)

        if (this.props.parent == 'favorites') {
            button = <button className='btn bg-danger' onClick={ () => this.props.removeItineraryFromFavoritesList(this.props.userId, el._id )}>X</button>
        } else if (this.props.parent == 'itineraries') {

            if (this.props.userId) {

                if (this.props.removeItineraryFromFavoritesList) button = <button className='btn bg-danger' onClick={ () => this.props.removeItineraryFromFavoritesList(this.props.userId, el._id )}>X</button>
                else button = <button className='btn bg-success' onClick={ () => this.props.addItineraryToFavoritesList(this.props.userId, el._id )}>+</button>
        
            } 
        }
        return (
            <li > 
                {button}
                <div className='itinerary-list-container'>
                
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
                        <Button className='btn-block btn-light'id={el._id} onClick={  (e) => this.props.handleClickDisplayDetails(e)   }>See Details</Button>
                    </div>
                </div>
            </li>
        )
       
    }
}

// export default Itinerary
const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        // favorites: state.itinerariesData.favorites
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // removeFavorite: (id, itineraryId) => dispatch(removeFavorite(id, itineraryId)),
//         // addFavorite: (id, itineraryId) => dispatch(addFavorite(id, itineraryId))
//     }
// }


export default connect(mapStateToProps)(Itinerary);