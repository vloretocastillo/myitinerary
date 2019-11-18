import React from 'react';
import profileAvatar from '../assets/white-avatarr.jpg'



// import { connect } from 'react-redux'
// import { retrieveItinerary } from '../actions/itinerariesActions'

class Itinerary extends React.Component {

    generateHashtagList = (hashtags) => {
        return hashtags.map( (hashtag, index) => <span key={index}>{ hashtag }</span> )
    }

    render() {
        let el = this.props.element
        return (
            <li > 
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
                            {this.generateHashtagList(el.hashtags)}
                        </div>
                        
                    </div>
                    <div className='link-to-details'>
                        <button id={el._id} onClick={  (e) => this.props.handleClickDisplayDetails(e)   }>See Details</button>
                    </div>
                </div>
            </li>
        )
       
    }
}

export default Itinerary
// const mapStateToProps = (state) => {
//     return {
//         itinerary: state.itinerariesData.itinerary
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         retrieveItinerary: (itineraryId) => dispatch(retrieveItinerary(itineraryId))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);