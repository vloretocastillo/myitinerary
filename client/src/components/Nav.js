import React from 'react';
import profileAvatar from '../assets/white-avatarr.jpg'
import '../css/Navbar.css';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Nave extends React.Component {
    render (){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/cities">Cities</Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                <Link to='/login' className='profile-img-link'><img src={profileAvatar} alt="" className='avatar' /></Link>
            </Navbar>      
        )
    }
}

export default Nave;