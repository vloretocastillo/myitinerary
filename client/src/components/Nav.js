import React from 'react';
import profileAvatar from '../assets/white-avatarr.jpg'
import '../css/Navbar.css';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/usersActions'
import { retrieveFavoriteItineraries } from '../actions/itinerariesActions'




class Nave extends React.Component {

    state = {
        displayAvatar : true,
        currentUser : false
    }

    componentDidMount () {

        if ( localStorage.token ) {
            this.props.getCurrentUser(localStorage.token)
                .then(()=> {
                    // console.log('about to retreive the favorites with', this.props.currentUser.favorites )
                    // this.props.retrieveFavoriteItineraries(this.props.currentUser.favorites)
                    // .then(()=>{
                    //     console.log('FROM NAV< THE FAVORITES:')
                    //     console.log(this.props.favorites)
                    // })

                })
                
                // then(()=> {
                //     if (this.props.currentUser.first_name) {
                //         this.setState({currentUser : true})
                //     }
                // })
        }

        // if (this.props.currentUser.first_name) {
        //     this.setState({currentUser : true})
        // }
        
    }

    // shouldComponentUpdate(nextProps) {
    //     console.log(this.props)
    //     if (this.props.currentUser ) {
    //         this.props.retrieveFavoriteItineraries(this.props.currentUser.favorites)
    //     } 
    //     return true
    // }

    logout = () => {
        localStorage.removeItem('token')
    }

    handleToggle = () => {
        this.setState({ displayAvatar : !this.state.displayAvatar })
    }
    render (){
        

        let avatarProfile;
        if (this.state.displayAvatar) {
            avatarProfile = <Link to='/login' className='profile-img-link'><img src={ this.props.currentUser.avatar || profileAvatar} alt="" className='avatar' /></Link>
        } 

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={ () => this.handleToggle()}/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/cities">Cities</Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                        { this.props.currentUser.first_name ? <Nav.Link href="/favorites">Favorites</Nav.Link> : false  }
                        {!this.props.currentUser.first_name ? <Nav.Link href="/signup">Sign Up</Nav.Link> : false  }
                        {!this.props.currentUser.first_name ? <Nav.Link href="/login">Log In</Nav.Link> : <Nav.Link href="/" onClick={()=> this.logout()}>Log out</Nav.Link>   }
                    </Nav>
                </Navbar.Collapse>
                <div className='avatar-profile-wrapper'> 
                    { avatarProfile }
                </div>
            </Navbar>      
        )
    }
}

// export default Nave;

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        favorites: state.itinerariesData.favorites

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveFavoriteItineraries: (ids) => dispatch(retrieveFavoriteItineraries(ids)),
        getCurrentUser: (token) => dispatch(getCurrentUser(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nave);