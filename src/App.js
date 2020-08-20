import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import TripPages from './pages/TripPages';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/:country/:city" component={TripPages}/>
      </Switch>
    </Router>
  );
}

export default App;
