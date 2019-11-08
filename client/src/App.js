import React from 'react';
import Landing from './components/Landing';
import Cities from './components/Cities';

import { BrowserRouter, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Landing} />
            <Route exact path='/signup' component={Landing} />
            <Route exact path='/cities' component={Cities} />
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
