import React from 'react';
import Nav from  './components/Nav'
import Landing from './components/Landing';
import Cities from './components/Cities';
import Itineraries from './components/Itineraries';
import Itinerary from './components/Itinerary';
import Footer from './components/Footer';


import { BrowserRouter, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Landing} />
            <Route exact path='/signup' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route path='/itineraries' component={Itineraries} />
            <Route path='/itinerary' component={Itinerary} />
          </Switch>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
