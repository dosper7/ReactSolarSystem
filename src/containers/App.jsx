import React, { Component } from 'react';
import DBService from '../services/DatabaseService'
import SpaceObject from '../components/SpaceObject'
import AddItemBar from '../components/AddItemBar';
import WithCard from '../hoc/WithCard';
import SpaceObjectList from '../components/SpaceObjectList';
import FilterItem from '../components/FilterItem';

class App extends Component {

  constructor() {
    super();
    DBService.initDB();
    //this.state.planets = this.state.initialPlanets;
  }

  async componentDidMount() {
    // await DBService.getPlanets(dbPlanets => {
    //   this.setState({
    //     planets: dbPlanets,
    //     initialPlanets: dbPlanets
    //   })
    // });
  }

  state = {
    filterText: "",
    newPlanet: { name: "", info: "" },
    planets: [
      {
        id: 1, name: 'Earth', info: 'the blue planet',
        moons: [{
          id: 'moon1', info: 'the white moon'
        },
        {
          id: 'moon2', info: 'the wuaha moon'
        }]
      },
      {
        id: 2, name: 'Mercury', info: 'the red planet',
        moons: [{
          id: 'moon', info: 'the big moon'
        }]
      }],
  }


  addPlanet = (planet) => {
    let planets = [...this.state.planets];
    planets.push(planet);
    this.setState({ planets });
    //DBService.addPlanet(planet);
  }

  addMoon = (moon) => {
    DBService.addMoon(moon);
  }

  editPlanet = (e, planet) => {
    if (e.target.value) {
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

  filterPlanets = (text) => {
    let filteredPlanets = [...this.state.initialPlanets].filter(p => {
      return p.name.toLowerCase().search(text.toLowerCase()) !== -1;
    });
    this.setState({ planets: filteredPlanets });
  }

  render() {

    let planets = this.state.planets;

    if (this.state.planets) {

      planets = [...this.state.planets];

      if (this.state.filterText) {
        planets = planets.filter(p => p.name && p.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1);
      }

    }

    const spaceObjects = planets && planets.map(planet =>
      <SpaceObject
        key={planet.id}
        name={planet.name}
        info={planet.info}
        childSpaceObjects={planet.moons} />);

    return (
      <div className="container mt-4">
        <WithCard title="Add Planet" body={<AddItemBar onAddNewItem={this.addPlanet} />} />
        <WithCard body={<FilterItem onAddNewItem={this.addPlanet} onTextChange={(val) => this.setState({ filterText: val })} />} />
        <SpaceObjectList onSortSpaceObject={this.sortPlanets} spaceObjects={spaceObjects} filterText={this.state.filterText} />
      </div>
    );
  }
}

export default App;
