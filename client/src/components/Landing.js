import React from 'react';
import logo from '../assets/logo.png';
import itineraryDefault from '../assets/itinerary.jpg';
import circle from '../assets/circle.png';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import '../css/Landing.css';

import { connect } from 'react-redux'
import { retrieveSampleCities } from '../actions/dataActions'


class Landing extends React.Component {

    componentDidMount() {
        this.props.retrieveSampleCities()
    }

    render (){

        let cities = this.props.cities.map((el) => {
            let img = el.img ? el.img : itineraryDefault
            return (
                <Card className="text-white card" key={el._id}>
                    <div className='dark-cover'></div>
                    <Card.Img src={img} alt="Card image" />
                    <Card.ImgOverlay className='title-wrapper'>
                        <h1>{el.name}</h1>
                    </Card.ImgOverlay>
                </Card>
            )
        });
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
                        {cities}
                        
                    </div>
                    
                </section>

             
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesData.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveSampleCities: () => dispatch(retrieveSampleCities())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing);

