import React, { Component } from 'react';

class Actionbar extends Component {

    state = {
        filterText: "",
        planetName: "",
        planetInfo: ""
    }


    handleNewName = (evt) => {
        this.setState({ planetName: evt.target.value });
    }

    handlePlanetInfo = (evt) => {
        this.setState({ planetInfo: evt.target.value });
    }

    onNameClick = () => {

        if (this.state.planetName && this.state.planetInfo) {
            this.props.onAddNewPlanet({
                name: this.state.planetName,
                info: this.state.planetInfo,
                id: Date.now()
            });
            this.setState({ planetName: "", planetInfo: "" });
        }

    }

    render() {
        return (
            <div className="form-check form-check-inline">
                <div className="input-group">
                    <input type="text" placeholder="Filter Planet by Name" className="form-input" onChange={this.props.onFilterPlanet} />
                </div>

                <div className="input-group">
                    <input type="text" placeholder="Planet Name" className="form-input" onChange={this.handleNewName} value={this.state.planetName} />
                    <input type="text" placeholder="Planet Info" className="form-input" onChange={this.handlePlanetInfo} value={this.state.planetInfo} />
                    <button className="btn btn-primary btn-xs" onClick={this.onNameClick}>Add new Planet</button>
                </div>

            </div>
        );
    }

}

export default Actionbar; 