import React from 'react';
import { Link } from 'react-router-dom'
// import '../css/Cities.css';
import { connect } from 'react-redux'
import { retrieveCities } from '../actions/dataActions'

class Cities extends React.Component {
   
    state = {
        cities: [],
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
        let filteredCities = this.state.cities.filter(el => el.name.toLowerCase().match("^" + searchValue.toLowerCase()) )
        this.setState({ filteredCities, searchValue })
    }

    citiesToRender = () =>{
        let citiesList = []
        if (this.state.searchValue !== '') citiesList = this.state.filteredCities
        else if (this.state.cities.length > 0) citiesList = this.state.cities
        return citiesList
    }

    componentDidMount() {
        // this.fetchCities().then((cities)=>{ this.setState({ cities }) }) 
        this.props.retrieveCities()
            .then(()=>{this.setState({ cities: this.props.cities }) })
    }

    render() {
 
        let cities = this.citiesToRender().map((el) => {
            return (
                <li key={el._id}> 
                    {el.name} - {el.country} 
                    <Link to={ `/itineraries?city=${el.name}`} >Itineraries</Link>
                </li>
            )
        });


        return (
            <div className="main-container">
                <header className="">
                    <input onChange={this.handleInputSearch} placeholder='Filter...' type="text"/>
                </header>
                <ul>
                    {cities}
                </ul>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.data.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveCities: () => dispatch(retrieveCities())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cities);