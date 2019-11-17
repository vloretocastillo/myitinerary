import React from 'react';
import { Link } from 'react-router-dom'
import '../css/Cities.css';
import { Card } from 'react-bootstrap'
import itinerary from '../assets/itinerary.jpg';
import { connect } from 'react-redux'
import { retrieveCities } from '../actions/dataActions'

class Cities extends React.Component {
   
    state = {
        filteredCities : [],
        searchValue : ''
    }
  
    handleInputSearch = (e) => {
        let searchValue = e.target.value
        let filteredCities = this.props.cities.filter(el => el.name.toLowerCase().match("^" + searchValue.toLowerCase()) )

        this.setState({ filteredCities, searchValue })
    }

    citiesToRender = () =>{
        let citiesList = []
        if (this.state.searchValue !== '') citiesList = this.state.filteredCities
        else if (this.props.cities.length > 0) citiesList = this.props.cities
        return citiesList
    }

    componentDidMount() {
        this.props.retrieveCities()
    }

    render() {
    

        let cities = this.citiesToRender().map((el) => {
            let img = el.img ? el.img : itinerary
            return (
                <Link to={ `/itineraries?city=${el.name}`} key={el._id}>
                <Card className="text-white card" >
                    <div className='dark-cover'></div>
                    <Card.Img src={img} alt="Card image" />
                    <Card.ImgOverlay className='title-wrapper'>
                        <h1>{el.name}</h1>
                    </Card.ImgOverlay>
                </Card>
                </Link>
            )
        });


        return (
            <div className="main-container">
                <header className="">
                    <input onChange={this.handleInputSearch} placeholder='Filter...' type="text"/>
                </header>
                
                <ul className='cities-list-container'>
                    {cities}
                </ul>
                
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
        retrieveCities: () => dispatch(retrieveCities())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cities);