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
    showingMoonInfo: false,
  }

  onSearchBarTextChanged = (txt) => {
    this.setState({ filterText: txt })
  }

  showMoonsInfo = (evt, planet) => {
    evt.preventDefault();
    if (this.state.showingMoonInfo && this.props.currentPlanetContext && this.props.currentPlanetContext.id == planet.id) {
      this.setState({ showingMoonInfo: false });
    } else {
      this.props.onShowMoonInfo(planet);
      this.setState({ showingMoonInfo: true });
    }
  }

  handleNewMoonAdding = (moon) => {
    moon.planetId = this.props.currentPlanetContext.id;
    this.props.onAddNewMoon(moon);
  }

  getMoonsInContext = () => {
    return this.props.currentPlanetContext && this.props.currentPlanetContext.moons && this.props.currentPlanetContext.moons.map(moon =>
      <SpaceObject
        key={moon.id}
        enableChildActions={false}
        spaceObject={moon}
        onEdit={this.props.onEditMoon}
        onDelete={this.props.onDeleteMoon}
        groupName="Moons" />);
  }

  getCurrentPlanetName = () => {
    return this.props.currentPlanetContext ? this.props.currentPlanetContext.name : "";
  }

  render() {

    let planets = this.props.planets;
    if (planets) {
      if (this.state.filterText) {
        planets = planets.filter(p => p.name && p.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1);
      }
    }

    const hasPlanets = planets && planets.length > 0;

    const spaceObjects = planets && planets.map(planet =>
      <SpaceObject
        key={planet.id}
        onShowChildsClick={(e) => this.showMoonsInfo(e, planet)}
        enableChildActions={true}
        spaceObject={planet}
        childSpaceObjects={planet.moons}
        onEdit={this.props.onEditPlanet}
        onDelete={this.props.onDeletePlanet}
        groupName="Moons" />);

    return (
      <div className="container mt-4">
        <WithCard title="Add Planet" body={<AddItemBar onAddNewItem={this.props.onAddNewPlanet} >
          <SearchBar
            placeHolderHint="Planet Name"
            onTextChange={this.onSearchBarTextChanged} />
        </AddItemBar>} />

        {hasPlanets && <SpaceObjectList onSortSpaceObject={this.props.onSortPlanets} spaceObjects={spaceObjects} spaceObjectName="Planets" />}


        {(this.state.showingMoonInfo && this.props.currentPlanetContext) &&
          <div>
            <WithCard title={"Add Moon (" + this.getCurrentPlanetName() + ")"} body={
              <AddItemBar onAddNewItem={this.handleNewMoonAdding}>
                <SpaceObjectList onSortSpaceObject={this.props.onSortMoons} spaceObjects={this.getMoonsInContext()} spaceObjectName={"Moons of " + this.getCurrentPlanetName()} />
              </AddItemBar>
            } />
          </div>
        }

      </div>
    );
  }
}


//Redux bindings
const mapStateToProps = state => {
  return {
    currentPlanetContext: state.currentPlanetContext,
    planets: state.planets,
    filterText: state.filterText,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    // planets
    onAddNewPlanet: (planet) => dispatch({ type: actionTypes.ADD_NEW_PLANET, newPlanet: planet }),
    onEditPlanet: (planet) => dispatch({ type: actionTypes.EDIT_PLANET, editedPlanet: planet }),
    onDeletePlanet: (planet) => dispatch({ type: actionTypes.DELETE_PLANET, planet }),
    onSortPlanets: () => { dispatch({ type: actionTypes.SORT_PLANETS }); },

    //moons
    onAddNewMoon: (moon) => { dispatch({ type: actionTypes.ADD_NEW_MOON, newMoon: moon }); },
    onEditMoon: (moon) => { dispatch({ type: actionTypes.EDIT_MOON, moon }); },
    onDeleteMoon: (moon) => { dispatch({ type: actionTypes.DELETE_MOON, moon: moon }); },
    onShowMoonInfo: (planet) => { dispatch({ type: actionTypes.SHOW_MOON_INFO, planet }); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolarSystem);
