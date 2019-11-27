import React from 'react';
import profileAvatar from '../assets/white-avatarr.jpg'
import '../css/Navbar.css';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Nave extends React.Component {

    state = {
        displayAvatar : true
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

export default Nave;