import React from 'react';
import logo from '../assets/logo.png';
import circle from '../assets/circle.png';
import home from '../assets/home.png';
import { Link } from 'react-router-dom'

import '../css/Landing.css';

class Landing extends React.Component {
    render (){
        return (
            <div className="main-container">
                <header className="">
                    <img src={logo} className="" alt="logo" />
                </header>

                <section className="slogan">
                    <p>Find your perfect trip, designed by insiders who know and love their cities</p>
                </section>

                <section className="call-to-action">
                    <p>Start Browsing</p>
                    <img src={circle} className="" alt="circle arrow" />

                </section>

                <section className="links">
                    <p>Want to buil your own MYtinerary</p>
                    <div className='links-wrapper'>
                        <Link to='/login'>Log in</Link>
                        <Link to='/signup'>Create Account</Link>
                    </div>
                </section>

                <footer>
                    <Link to='/'><img src={home} className="" alt="home" /></Link>
                </footer>
            </div>
        )
    }
}

export default Landing;