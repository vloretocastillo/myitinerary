import React from 'react';
import logo from '../assets/logo.png';
import itinerary from '../assets/itinerary.jpg';
import circle from '../assets/circle.png';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
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
                    <Link to='/cities'><img src={circle} className="" alt="circle arrow" /></Link>
                </section>


                <section className="popular-itineraries">
                    <p>Popular MYitineraries</p>

                    
                    <div className='itineraries-wrapper'>
                        <Card className="text-white card">
                            <Card.Img src={itinerary} alt="Card image" />
                            <Card.ImgOverlay>
                                <h1>Card Title</h1>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="text-white card">
                            <Card.Img src={itinerary} alt="Card image" />
                            <Card.ImgOverlay>
                                <h1>Card Title</h1>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="text-white card">
                            <Card.Img src={itinerary} alt="Card image" />
                            <Card.ImgOverlay>
                                <h1>Card Title</h1>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="text-white card">
                            <Card.Img src={itinerary} alt="Card image" className='oimg'/>
                            <Card.ImgOverlay className='oimg'>
                                <h1>Card Title</h1>
                            </Card.ImgOverlay>
                        </Card>
                        
                    </div>
                    
                </section>

             
            </div>
        )
    }
}

export default Landing;