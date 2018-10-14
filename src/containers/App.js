import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css'
import SolarSystem from '../components/SolarSystem.js'
import ActionBar from '../components/ActionBar.js'
import DBService from '../services/DatabaseService'

class App extends Component {

  constructor() {
    super();
    DBService.initDB();
    //this.state.planets = this.state.initialPlanets;
  }

  async componentDidMount() {
   await DBService.getPlanets(dbPlanets => {
      this.setState({
        planets: dbPlanets,
        initialPlanets: dbPlanets
      })
    });
  }

  state = {
    initialPlanets:[],
    // initialPlanets: [
    //   {
    //     id: 1, name: 'Earth', info: 'the blue planet',
    //     moons: [{
    //       id: 'moon1', info: 'the white moon'
    //     },
    //     {
    //       id: 'moon2', info: 'the wuaha moon'
    //     }]
    //   },
    //   {
    //     id: 2, name: 'Mercury', info: 'the red planet',
    //     moons: [{
    //       id: 'moon', info: 'the big moon'
    //     }]
    //   }],
    planets: []
  }


  addPlanet = (planet) => {
    let planets = [...this.state.initialPlanets];
    planets.push(planet);
    this.setState({ planets, initialPlanets: planets });
    DBService.addPlanet(planet);
  }

  addMoon = (moon) => {
    DBService.addMoon(moon);
  }

  editPlanet = (e, planet) => {
    if(e.target.value){
      let planets = [...this.state.initialPlanets];
      let idx = planets.findIndex(p => p.id === planet.id);
      planets[idx].info = e.target.value;
      this.setState({ planets, initialPlanets: planets });
    }
    //DBService.editPlanet(planet);
  }

  deletePlanet = (planet) => {
    let planets = [...this.state.initialPlanets];
    planets.splice(planets.indexOf(planet), 1);
    this.setState({ planets, initialPlanets: planets });
    DBService.deletePlanet(planet);
  }

  editMoon = (moon) => {
    DBService.editPlanet(moon);
  }

  delenteMoon = (moon) => {
    DBService.editPlanet(moon);
  }

  sortPlanets = () => {
    let sortedPlanets = (this.state.planets || this.state.initialPlanets);
    sortedPlanets = [...sortedPlanets].reverse();
    this.setState({ planets: sortedPlanets });
  }

  filterPlanets = (evt) => {
    let filteredPlanets = [...this.state.initialPlanets].filter(p => {
      return p.name.toLowerCase().search(evt.target.value.toLowerCase()) !== -1;
    });
    this.setState({ planets: filteredPlanets });
  }

  render() {
    return (
      <div className="container">
        <SolarSystem
          planets={this.state.planets}
          onPlanetSort={this.sortPlanets}

          onPlanetDelete={this.deletePlanet}
          onPlanetEditInfo={this.editPlanet}

          onMoonAdd={this.addMoon}
          onMoonDelete={this.delenteMoon}
          onMoonEdit={this.editMoon}
        >
          <ActionBar onFilterPlanet={this.filterPlanets} onAddNewPlanet={this.addPlanet} />
        </SolarSystem>
      </div>
    );
  }
}

export default App;
