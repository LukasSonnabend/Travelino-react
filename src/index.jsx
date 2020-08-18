import React, { useState } from 'react';
import worldLowRes from './worldMap.json';
import { VectorMap } from '@south-paw/react-vector-maps';
import countryList from './countries';

import Autocomplete from "./Autocomplete";

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
        super()
        

        this.state = {
            clicked: "", 
            input: "",
            data: {},
            showResults: false,
            mockData: {"country":"France","response":{"more":true,"results":[{"id":"Paris","name":"Paris","score":9.9823657869383,"snippet":"The City of Light and one of the most visited places on Earth: romance, cuisine, the Eiffel Tower and a surprising amount of green await you."},{"id":"Strasbourg","name":"Strasbourg","score":8.88961573815986,"snippet":"Known for museums. Recommended places to visit are Strasbourg Cathedral, Palais Rohan and Musée de l’Œuvre Notre-Dame."},{"id":"Nice","name":"Nice","score":8.76918290264111,"snippet":"Known for dinner. Recommended places to visit are MAMAC, Villa Ephrussi de Rothschild and Villa Kerylos."},{"id":"Versailles2C_Yvelines","name":"Versailles","score":8.43516135381981,"snippet":"Known for museums. Recommended places to visit are Palace of Versailles, Hall of Mirrors and Versailles Orangerie."},{"id":"Bordeaux","name":"Bordeaux","score":8.39535923805795,"snippet":"Known for cycling. Recommended places to visit are Bordeaux Cathedral, Miroir d'eau and BETASOM."},{"id":"Lyon","name":"Lyon","score":8.39238444112527,"snippet":"Known for shopping. Recommended places to visit are Esplanade de Fourvière, St Jean Cathedral and Musée des Beaux-Arts de Lyon."},{"id":"Avignon","name":"Avignon","score":8.38060307227538,"snippet":"Known for dinner. Recommended places to visit are Palais des Papes, Pont Saint-Bénézet and Musée du Petit Palais."},{"id":"Marseille","name":"Marseille","score":8.37768668946974,"snippet":"Known for museums. Recommended places to visit are Notre-Dame de la Garde, Château d'If and Marseille Cathedral."},{"id":"Amiens","name":"Amiens","score":8.32163175161971,"snippet":"Known for drinks. Recommended places to visit are Amiens Cathedral, Musée de Picardie and Amiens Synagogue."},{"id":"NC3AEmes","name":"Nîmes","score":8.2520291829197,"snippet":"Known for lunch. Recommended places to visit are Pont du Gard, Arènes de Nîmes and Maison Carrée."}]}}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.makeMap = this.makeMap.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.handleAutoComplete = this.handleAutoComplete.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    handleAutoComplete(userInput){
        this.setState({
            clicked: userInput
        })

    }

    handleChange(event){
        alert("change");
        console.log(event.target);
        if (event.target.id === "clear"){
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
        //const [clicked, setClicked] = React.useState('Klues');
        this.layerProps = {
            onClick: ({ target }) => this.setState( {clicked: target.attributes.name.value} ),
          };
    };

    layerProps = {
        onClick: ({ target }) => this.setState( {clicked: target.attributes.name.value} ),
      };

    determineDestination(){
        const destination = this.state.clicked;
        console.log("desti: " + destination);

        //send selected Destination to Autocomplete here
        

        return this.state.clicked
    }

    makeRequest(){
        console.log("Running Req function");
        let url = 'http://127.0.0.1:5000/api/' + this.state.clicked; 
        console.log(url);
        fetch(url, {method: 'get', mode: 'cors'}).then(res => res.json())
        .then( ( data )  => {this.setState({data: data, showResults: true})}).catch( error => console.log(error))

    }

    showCities(data){
        let citiesObj = {};
        let topCities = [];
        citiesObj.country = data.country;
        for (let city in data["response"]["results"]){
            let pushArr = [];
            pushArr.push(data["response"]["results"][city]["name"]);
            pushArr.push(data["response"]["results"][city]["score"]);
            pushArr.push(data["response"]["results"][city]["snippet"]);
            topCities.push(pushArr);
        
        }

        citiesObj.cities = topCities;


        return JSON.stringify(citiesObj);
    }
    resetSearch(){
        this.setState({
            showResults: false
        })
    }
    
    

    render(){
        return (
            <div className="justify-content-center">
                
                {/* {console.log(this.layerProps)} */}
                {!this.state.showResults && <div>
                <h5>Know where you are going?</h5>
                {/* <input value={this.state.input} onChange={this.handleChange}/> */}
                
                <Autocomplete suggestions={countryList} userClickPut={this.state.clicked} handleAutoComplete={this.handleAutoComplete}/>
                {/* https://www.digitalocean.com/community/tutorials/react-react-autocomplete#making-it-pretty */}

                
                {/* <button id="clear" type="button" className="btn-light" onClick={this.handleChange}>Clear</button> */}
                <div className="row justify-content-center">
                    <button type="button" className="btn btn-light">Search</button>
                </div>

                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-xl-6">
                <VectorMap {...worldLowRes}  layerProps={this.layerProps} onChange={this.clicked} currentLayers="{'fr'}"/>
                    </div>
                </div>

                <p>Search destinations in: {this.determineDestination()}</p>
                <button className="btn btn-light" onClick={() => this.makeRequest()}>Go</button>
                {/* <p>{JSON.stringify(this.state.data)}</p> */}
                </div>
            }
                {this.state.showResults && 
                <div>
                    <ResultView resultData={this.state.data} country={this.state.clicked}/>
                    <button className="btn-warning" onClick={() => this.resetSearch()}>Reset Search</button>
                </div>
                }
                

                {/* <p>{this.showCities(this.state.mockData)}</p> */}
            </div>
        )
    }
}

class ResultView extends React.Component {
    constructor(){
        super()
    
    this.state = {
        topCities : []
    };
    }

    cityResults(x){
        console.log(x.results)
        let country = this.props.country
        let topCities = [];
        for (let result in x.results){
            let pushArr = [];
            pushArr.push(x["results"][result]["name"]);
            //pushArr.push(x["results"][result]["score"]);
            pushArr.push(x["results"][result]["snippet"]);
            topCities.push(pushArr);
        }
    
        // this.setState({
        //     topCities: topCities
        // })
        console.log(topCities.length);

        //try to export as table
        let table = [];
        let count = 0;
        for (let i = 0; i < 5; i++){
            let children = []
            for (let j = 0; j < 2; j++){
                let city = topCities[count][0]
            children.push(<td> <a href={"../"+this.props.country.toLowerCase()+"/"+city.toLowerCase()} data-toggle="tooltip" title={topCities[count][1]}>{ count+1 + ". " +topCities[count][0]}</a></td>)
                count++
            }
            table.push(<tr>{children}</tr>);
        }
        return table



        //return topCities; 
        }
 
    

    render() {
        return (
                <div className="SearchResults">
                    <img src="https://www.countryflags.io/fr/flat/64.png"></img>
                    {/* <button onClick={() => this.cityResults(this.props.resultData)}>Get Cities</button> */}
                    
                    <p>Top Cities in {this.props.country}</p>
                    {/* {this.state.topCities.map((city) => <p><a href={"../"+this.props.country.toLowerCase()+"/"+city[0].toLowerCase()}>{city[0]}</a> </p>)} */}
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <table className="table table-striped table-dark table-bordered table-responsive">
                                <tbody>
                                    {this.cityResults(this.props.resultData)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* {this.cityResults(this.props.resultData)}
                    {topCities.map((city) => <p><a href={"../"+country.toLowerCase()+"/"+city[0].toLowerCase()}>{city[0]}</a> </p>)} */}
                </div>
        )
    }
}

class Footer extends React.Component{
    constructor(){
        super()
    };
    render(){
        return(
            <footer>
                <p>Test Footer Text</p>
            </footer>

        )
    }
}



export{
    NavigationBar,
    //JsxTest,
    MainSearch,
    ResultView,
    Footer
} 

