import React, { Component } from 'react';
import DBService from '../services/DatabaseService'
import SpaceObject from '../components/SpaceObject'
import AddItemBar from '../components/AddItemBar';
import WithCard from '../hoc/WithCard';
import SpaceObjectList from '../components/SpaceObjectList';
import SearchBar from '../components/SearchBar';

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
    //DBService.addMoon(moon);
  }

  editPlanet = (planet) => {
      let planets = [...this.state.planets];
      let idx = planets.findIndex(p => p.id === planet.id);
      planets[idx] = planet;
      this.setState({planets});
    
    //DBService.editPlanet(planet);
  }

  deletePlanet = (planet) => {
    let planets = [...this.state.planets];
    planets.splice(planets.indexOf(planet), 1);
    this.setState({ planets });
    //DBService.deletePlanet(planet);
  }

  editMoon = (moon) => {
    //DBService.editPlanet(moon);
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

  onSearchBarTextChanged = (txt) => {
    this.setState({ filterText: txt })
  }

  showMoonsInfo = (planet) =>{

  }

  render() {

    let planets = this.state.planets;
    if (planets) {
      planets = [...this.state.planets];
      if (this.state.filterText) {
        planets = planets.filter(p => p.name && p.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1);
      }
    }

    const hasPlanets = planets && planets.length > 0;

    const spaceObjects = planets && planets.map(planet =>
      <SpaceObject
        showChildsInfoClick={this.showMoonsInfo}
        key={planet.id}
        spaceObject={planet}
        childSpaceObjects={planet.moons}
        onEdit={this.editPlanet}
        onDelete={this.deletePlanet}
        groupName="Moons" />);

    return (
      <div className="container mt-4">
        <WithCard title="Add Planet" body={<AddItemBar onAddNewItem={this.addPlanet} />} />
        <WithCard body={
          <SearchBar
            onAddNewItem={this.addPlanet}
            placeHolderHint="Planet Name"
            onTextChange={this.onSearchBarTextChanged} />
        } />
        {hasPlanets && <SpaceObjectList onSortSpaceObject={this.sortPlanets} spaceObjects={spaceObjects} filterText={this.state.filterText} />}
      </div>
    );
  }
}

export default App;
