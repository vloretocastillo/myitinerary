import React from 'react';
// import logo from '../assets/logo.png';
// import circle from '../assets/circle.png';
// import home from '../assets/home.png';
// import { Link } from 'react-router-dom'

// import '../css/Navbar.css';
// import Navbar from 'react-bootstrap/Navbar'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


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
            </Navbar>      
        )
    }
}

export default Nave;