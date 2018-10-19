import React, { Component } from 'react';

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
        if (this.state.info && this.state.name) {
            const newInfo = { id: this.props.spaceObject.id, ...this.state };
            this.props.onEdit(newInfo);
            this.setState(this.cleanState);
        }
    }

    render() {

        const spaceObject = this.props.spaceObject;
        const style ={width:"33%"};

        return (
            <tr>
                <td style={style}>
                    <p>
                        {this.state.onReadMode ? spaceObject.name : this.getEditField("name", spaceObject.name)}
                    </p>
                </td>
                <td style={style}>
                    <p>
                        {this.state.onReadMode ? spaceObject.info : this.getEditField("info", spaceObject.info)}
                    </p>
                    {this.props.enableChildActions && <a title="Click to see more info" onClick={this.props.onShowChildsClick} href="#" className="badge badge-pill badge-info">{this.props.childSpaceObjects ? this.props.childSpaceObjects.length : "0"} {this.props.groupName}</a>}
                </td>
                <td style={style}>
                    {!this.state.onReadMode && <button className="mr-2 btn btn-outline-info btn-xs" onClick={this.saveChange}>Save</button>}
                    {!this.state.onReadMode && <button className="mr-2 btn btn-outline-danger btn-xs" onClick={this.toggleMode}>Cancel</button>}

                    {this.state.onReadMode && <button className="mr-2 btn btn-outline-danger btn-xs" onClick={() => this.props.onDelete(spaceObject)}>Delete</button>}
                    {this.state.onReadMode && <button className="mr-2 btn btn-outline-info btn-xs" onClick={this.toggleMode}>Edit</button>}

                </td>

            </tr>
        );
    }

}

export default SpaceObject; 