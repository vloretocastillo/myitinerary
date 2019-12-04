import React from 'react';
import profileAvatar from '../assets/black-avatarr.png'
import Button from 'react-bootstrap/Button'



import { connect } from 'react-redux'
import { removeFavorite, addFavorite } from '../actions/itinerariesActions'

class Itinerary extends React.Component {


    componentDidMount(){
        console.log(this.props.currentUser, this.props.favorites)
    }

    render() {
        
        let el = this.props.element
        let button;
        if (this.props.currentUser.first_name) {
            if (this.props.currentUser.favorites.indexOf(el._id) != -1) button = <button onClick={ () => this.props.removeFavorite(this.props.currentUser._id, el._id )}>Remove</button>
            else button = <button onClick={ () => this.props.addFavorite(this.props.currentUser._id, el._id )}>Add</button>
        }
        return (
            <li > 
                
                <div className='itinerary-list-container'>
                {button}
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

const mapDispatchToProps = (dispatch) => {
    return {
        removeFavorite: (id, itineraryId) => dispatch(removeFavorite(id, itineraryId)),
        addFavorite: (id, itineraryId) => dispatch(addFavorite(id, itineraryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);