import React from 'react';
import { Link } from 'react-router-dom'
import '../css/Cities.css';
import { Card } from 'react-bootstrap'
import itinerary from '../assets/itinerary.jpg';
import { connect } from 'react-redux'
import { retrieveCities } from '../actions/citiesActions'

class Cities extends React.Component {
   
    state = {
        // cities: [],
        filteredCities : [],
        searchValue : ''
    }
  

    // fetchCities = async () => {
    //     const cities = await fetch(`http://localhost:5000/api/cities/all`, {
    //             method: 'GET',
    //         })
    //         .then(res =>  res.json() )
    //         .catch(err => console.error(err)) 
    //     return cities
    // }

    handleInputSearch = (e) => {
        let searchValue = e.target.value
        // let filteredCities = this.state.cities.filter(el => el.name.toLowerCase().match("^" + searchValue.toLowerCase()) )
        let filteredCities = this.props.cities.filter(el => el.name.toLowerCase().match("^" + searchValue.toLowerCase()) )

        this.setState({ filteredCities, searchValue })
    }

    citiesToRender = () =>{
        let citiesList = []
        if (this.state.searchValue !== '') citiesList = this.state.filteredCities
        // else if (this.state.cities.length > 0) citiesList = this.state.cities
        else if (this.props.cities.length > 0) citiesList = this.props.cities
        return citiesList
    }

    componentDidMount() {
        // this.fetchCities().then((cities)=>{ this.setState({ cities }) }) 
        this.props.retrieveCities()
            // .then(()=>{this.setState({ cities: this.props.cities }) })
    }

    render() {
        
        // let cities = this.citiesToRender().map((el) => {
        //     let img = el.img ? el.img : itinerary
        //     return (
        //         <li key={el._id}> 
        //             <div className='dark--cover'></div>
        //             <Link to={ `/itineraries?city=${el.name}`} >
        //                 <div className="card card-cities-index">
        //                     <img src={img} alt="card image"/>
        //                     <h1>{el.name}</h1>
        //                 </div>
        //             </Link>
        //         </li>
        //     )
        // });

        let cities = this.citiesToRender().map((el) => {
            let img = el.img ? el.img : itinerary
            return (
                <Link to={ `/itineraries?city=${el.name}`} >
                <Card className="text-white card" key={el._id}>
                    <div class='dark-cover'></div>
                    <Card.Img src={img} alt="Card image" />
                    <Card.ImgOverlay>
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