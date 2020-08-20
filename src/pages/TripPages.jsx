import React, { useState } from 'react';
import { NavigationBar, TripView } from '../index.jsx';

class Trip extends React.Component {
    render(){
      return(
      <div>
        <NavigationBar/>
        <TripView city={this.props.match.params.city} country={this.props.match.params.country}/>
      </div>
    )
  }
}

export default Trip;