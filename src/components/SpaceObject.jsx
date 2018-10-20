import React, { Component } from 'react';
import WithGroupItem from '../hoc/WithGroupItem';

class SpaceObject extends Component {

    constructor(props) {
        super(props);
        this.cleanState = {
            onReadMode: true,
            name: "",
            info: "",
        }

        this.state = this.cleanState;
    }

    state = {
        onReadMode: true,
        name: "",
        info: "",
    }

    onEditSpaceObject = () => {
        this.props.onEdit()
    }

    toggleMode = () => {
        this.setState({ onReadMode: !this.state.onReadMode });
    }


    getEditField = (fieldName, oldVal) => {
        return (<input type="text" className="form-control form-control-sm" name={fieldName} placeholder={oldVal} onChange={this.handleFieldChange} />)
    }

    handleFieldChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    saveChange = () => {
        const spaceObject = this.props.spaceObject;
        if (this.state.info || this.state.name) {
            const newSpaceObject = {
                id: this.props.spaceObject.id,
                name: this.state.name || spaceObject.name,
                info: this.state.info || spaceObject.info
            };
            this.props.onEdit(newSpaceObject);
            this.setState(this.cleanState);
        }
    }

    buildCoumns = () => {

        const spaceObject = this.props.spaceObject;
        const col1 = (this.state.onReadMode ? spaceObject.name : this.getEditField("name", spaceObject.name));

        const col2 =
            <React.Fragment>
                {this.state.onReadMode ? <span className="col-sm-2 col-form-label">{spaceObject.info}</span> : this.getEditField("info", spaceObject.info)}
                {this.props.enableChildActions && <span className="badge badge-info">{this.props.childSpaceObjects ? this.props.childSpaceObjects.length : "0"} {this.props.groupName}</span>}
            </React.Fragment>;

        const col3 =
            <React.Fragment>
                {!this.state.onReadMode && <button className="mr-2 btn btn-outline-info btn-sm" onClick={this.saveChange}>Save</button>}
                {!this.state.onReadMode && <button className="mr-2 btn btn-outline-danger btn-sm" onClick={this.toggleMode}>Cancel</button>}
                {this.state.onReadMode && <button className="mr-2 btn btn-outline-danger btn-sm" onClick={() => this.props.onDelete(spaceObject)}>Delete</button>}
                {this.state.onReadMode && <button className="mr-2 btn btn-outline-info btn-sm" onClick={this.toggleMode}>Edit</button>}
                {this.props.enableChildActions && <button onClick={this.props.onShowChildsClick} className="mr-2 btn btn-outline-success btn-sm">Manage {this.props.groupName}</button>}
            </React.Fragment>;

        return [col1, col2, col3];
    }

    render() {
        const columns = this.buildCoumns();
        return (
            <WithGroupItem groupItems={columns} />
        );
    }

}

export default SpaceObject; 