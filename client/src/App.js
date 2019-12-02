import React from 'react';
import Nav from  './components/Nav'
import Landing from './components/Landing';
import Cities from './components/Cities';
import Itineraries from './components/Itineraries';
// import Itinerary from './components/Itinerary';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';


import './css/App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'



class App extends React.Component {
  
  render () {
    return (
      <BrowserRouter>
          <div className="App">
            <Nav />
            <Switch>
              <Route exact path='/' component={Landing} />
\              <Route exact path='/cities' component={Cities} />
              <Route path='/itineraries' component={Itineraries} />

             

              <Route exact path="/login" component={Login} >
                { this.props.currentUser.first_name ? <Redirect to="/" /> : false }
              </Route>

              <Route exact path="/signup" component={Signup} >
                { this.props.currentUser.first_name ? <Redirect to="/" /> : false }
              </Route>

            </Switch>
            <Footer />
          </div>
      </BrowserRouter>
    )
  }
}

// export default App;

const mapStateToProps = (state) => {
  return {
      currentUser: state.auth.currentUser
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//       getCurrentUser: (token) => dispatch(getCurrentUser(token))
//   }
// }


export default connect(mapStateToProps)(App);
