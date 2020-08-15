import React, { useState } from 'react';
import worldLowRes from './worldMap.json';
import { VectorMap } from '@south-paw/react-vector-maps';

function NavigationBar(){
    return(
        <div id="navBar">
            <nav className="navbar navbar-dark bg-dark justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <span style={{fontFamily: "Lobster", fontSize: 40, color: "white"}}>Travelino</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

class MainSearch extends React.Component {
    constructor(){
        super();
        this.state = {
            clicked: "", 
            input: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.makeMap = this.makeMap.bind(this);
    }

    handleChange(event){
        console.log(event.target);
        if (event.target.id == "clear"){
            event.target.value = "";
        }
        this.setState({
            input: event.target.value
        });
    }

    handleSelect(event){
        this.setState({
            clicked: event.target.value
        })
    }

    makeMap(){
        const [clicked, setClicked] = React.useState('Klues');
        this.layerProps = {
            onClick: ({ target }) => this.setState( {clicked: target.attributes.name.value} ),
          };
    };

    layerProps = {
        onClick: ({ target }) => this.setState( {clicked: target.attributes.name.value} ),
      };

    determineDestination(){
        const destination = this.state.input;
        console.log("desti: " + destination);
        console.log("clicked: " + this.state.clicked);
        return destination == "" ? this.state.clicked : this.state.input;
    }  
    
    

    render(){
        return (
            <div>
                {console.log(this.layerProps)}
                <p>This Shits Fucked</p>
                <h5>Know where you are going?</h5>
                <input value={this.state.input} onChange={this.handleChange}/>
                <button type="button" className="btn-light">Search</button>
                <button id="clear" type="button" className="btn-light" onClick={this.handleChange}>Clear</button>
                <VectorMap {...worldLowRes}  layerProps={this.layerProps} onChange={this.clicked}/>
                <hr />
                <p>Clicked: {this.determineDestination()}</p>
            </div>
        )
    }
}

// function JsxTest(){

//     const [clicked, setClicked] = React.useState('None');
//     const layerProps = {
//         onClick: ({ target }) => setClicked(target.attributes.name.value),
//       };
    
//     return(
//         <div id="searchComponent">
//             <h5>Know where you are going?</h5>
//             <input value={clicked} onChange={clicked}/>
//             <button type="button" className="btn-light">Search</button>
//             <br />
//             <br />
//             <h5>Explore</h5>
//             <br />
//             <VectorMap {...worldLowRes} layerProps={layerProps} style={{width: "90%"}} />
//             <a href="https://react-vector-maps.netlify.app/maps">Vector Map</a>
//             <br />
//             <br />
//             <p>Clicked: {clicked}</p>
            
//         </div>
//     );
// }



export{
    NavigationBar,
    //JsxTest,
    MainSearch
} 