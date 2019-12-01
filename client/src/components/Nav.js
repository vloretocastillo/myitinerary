import React from 'react';
import profileAvatar from '../assets/white-avatarr.jpg'
import '../css/Navbar.css';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/usersActions'



class Nave extends React.Component {

    state = {
        displayAvatar : true
    }

    componentDidMount () {

        if (localStorage.token ) {
            // console.log('theres a token', localStorage.token)
            // console.log('theres a ccc user', this.props.currentUser)
            this.props.getCurrentUser(localStorage.token)
        }
        // if (localStorage.token) get the user information and update the current user in the state
        // ask if there's a current user and if so, display the avatar picture that will take me to the user profile page -- which will be protected 
    }

    handleToggle = () => {
        this.setState({ displayAvatar : !this.state.displayAvatar })
    }
    render (){
        let avatarProfile;
        if (this.state.displayAvatar) {
            avatarProfile = <Link to='/login' className='profile-img-link'><img src={profileAvatar} alt="" className='avatar' /></Link>
        } 
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={ () => this.handleToggle()}/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/cities">Cities</Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {avatarProfile}
                
            </Navbar>      
        )
    }
}

// export default Nave;

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUser: (token) => dispatch(getCurrentUser(token))
        // login: (user) => dispatch(login(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nave);