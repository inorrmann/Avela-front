
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import AddLeague from './pages/AddLeague';
import FindLeagues from './pages/FindLeagues';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <ThankYou />
          </Route>
          <Route exact path='/leagues'>
            <AddLeague />
          </Route>
          <Route exact path='/sponsor'>
            <FindLeagues />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
