import React, { Component } from 'react';
import SpaceObject from '../components/SpaceObject'
import AddItemBar from '../components/AddItemBar';
import WithCard from '../hoc/WithCard';
import SpaceObjectList from '../components/SpaceObjectList';
import SearchBar from '../components/SearchBar';
import { connect } from 'react-redux';
import actionTypes from '../store/actions.js';

class SolarSystem extends Component {

  state = {
    filterText: "",
  }


  // addPlanet = (planet) => {
  //   planet.id = Date.now();
  //   let planets = [...this.state.planets];
  //   planets.push(planet);
  //   this.setState({ planets });
  // }


  // editPlanet = (planet) => {
  //   let planets = [...this.state.planets];
  //   let idx = planets.findIndex(p => p.id === planet.id);
  //   planets[idx] = planet;
  //   this.setState({ planets });
  // }

  // deletePlanet = (planet) => {
  //   let planets = [...this.state.planets];
  //   planets.splice(planets.indexOf(planet), 1);
  //   this.setState({ planets });
  // }


  // sortPlanets = () => {
  //   let sortedPlanets = (this.state.planets || this.state.initialPlanets);
  //   sortedPlanets = [...sortedPlanets].reverse();
  //   this.setState({ planets: sortedPlanets });
  // }

  onSearchBarTextChanged = (txt) => {
    this.setState({ filterText: txt })
  }

  showMoonsInfo = (planet) => {

  }

  render() {

    let planets = this.props.planets;
    if (planets) {
      planets = [...this.props.planets];
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
        onEdit={this.props.onEditPlanet}
        onDelete={this.props.onDeletePlanet}
        groupName="Moons" />);

    return (
      <div className="container mt-4">
        <WithCard title="Add Planet" body={<AddItemBar onAddNewItem={this.props.onAddNewPlanet} />} />
        <WithCard body={
          <SearchBar
            onAddNewItem={this.props.onAddNewPlanet}
            placeHolderHint="Planet Name"
            onTextChange={this.onSearchBarTextChanged} />
        } />
        {hasPlanets && <SpaceObjectList onSortSpaceObject={this.sortPlanets} spaceObjects={spaceObjects} />}
      </div>
    );
  }
}

//Redux configur
const mapStateToProps = state => {
  return {
    planets: state.planets,
    filterText: state.filterText,
  }
}

const mapDispatchToPros = dispatch => {
  return {
    onAddNewPlanet: (planet) => dispatch({ type: actionTypes.ADD_NEW_PLANET, newPlanet: planet }),
    onEditPlanet: (planet) => dispatch({ type: actionTypes.EDIT_PLANET, editedPlanet: planet }),
    onDeletePlanet: (id) => dispatch({ type: actionTypes.DELETE_PLANET, planetId: id })
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(SolarSystem);
