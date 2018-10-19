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
    currentMoons: [],
    currentPlanet: {}
  }

  onSearchBarTextChanged = (txt) => {
    this.setState({ filterText: txt })
  }

  showMoonsInfo = (planet) => {
    const spaceObjects = planet.moons && planet.moons.map(moon =>
      <SpaceObject
        key={moon.id}
        enableChildActions={false}
        spaceObject={moon}
        onEdit={this.props.onEditMoon}
        onDelete={this.props.onDeleteMoon}
        groupName="Moons" />);

    this.setState({
      currentMoons: spaceObjects,
      currentPlanet: planet,
    });
  }

  closeMoonsInfo = () => {
    this.setState({
      currentMoons: [],
      currentPlanet: {}
    });
  }

  handleNewMoonAdding = (moon) =>{
    moon.planetId = this.state.currentPlanet.id;
    this.props.onAddNewMoon(moon);
  }

  render() {

    let planets = this.props.planets;
    if (planets) {
      if (this.state.filterText) {
        planets = planets.filter(p => p.name && p.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1);
      }
    }

    const hasPlanets = planets && planets.length > 0;
    const showMoonsInfo = this.state.currentMoons && this.state.currentMoons.length > 0;

    const spaceObjects = planets && planets.map(planet =>
      <SpaceObject
        key={planet.id}
        onShowChildsClick={() => this.showMoonsInfo(planet)}
        enableChildActions={true}
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
            placeHolderHint="Planet Name"
            onTextChange={this.onSearchBarTextChanged} />
        } />

        {hasPlanets && <SpaceObjectList onSortSpaceObject={this.props.onSortPlanets} spaceObjects={spaceObjects} spaceObjectName="Planets" />}

        {showMoonsInfo &&
          <div>
            <WithCard title="Add Moon" body={<AddItemBar onAddNewItem={this.handleNewMoonAdding} />} />
            <SpaceObjectList onSortSpaceObject={this.props.onSortMoons} spaceObjects={this.state.currentMoons} spaceObjectName={"Moons of " + this.state.currentPlanet.name} />
          </div>
        }

      </div>
    );
  }
}


//Redux bindings
const mapStateToProps = state => {
  return {
    planets: state.planets,
    filterText: state.filterText,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    // planets
    onAddNewPlanet: (planet) => dispatch({ type: actionTypes.ADD_NEW_PLANET, newPlanet: planet }),
    onEditPlanet: (planet) => dispatch({ type: actionTypes.EDIT_PLANET, editedPlanet: planet }),
    onDeletePlanet: (id) => dispatch({ type: actionTypes.DELETE_PLANET, planetId: id }),
    onSortPlanets: () => { dispatch({ type: actionTypes.SORT_PLANETS }); },

    //moons
    onAddNewMoon: (moon) => { dispatch({ type: actionTypes.ADD_NEW_MOON, newMoon: moon }); },
    onEditMoons: () => { dispatch({ type: actionTypes.EDIT_MOON }); },
    onDeleteMoons: () => { dispatch({ type: actionTypes.DELETE_MOON }); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystem);
