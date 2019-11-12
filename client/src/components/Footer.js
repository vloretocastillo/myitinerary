import React from 'react';
import home from '../assets/home.png';
import { Link } from 'react-router-dom';


// import '../css/Footer.css';

function Footer() {
    return (
        <footer>
            <Link to='/'><img src={home} className="" alt="home" /></Link>
        </footer>
    )    
}

export default Footer;