import React, { Component } from 'react';

class AddItemBar extends Component {

    state = {
        name: "",
        info: "",
    }

    onChangeHandler = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onAddNewItem = evt => {
        if (this.state.name && this.state.info) {
            let item = { ...this.state };
            this.props.onAddNewItem(item);
            this.setState(() => ({ name: "", info: "" }));
        }
    }

    render() {
        return (
            <div className="form-inline col-sm-6">
                <div className="col">
                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.onChangeHandler} value={this.state.name} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" name="info" placeholder="Info" onChange={this.onChangeHandler} value={this.state.info} />
                </div>
                <button className="btn btn-primary btn-sm" onClick={this.onAddNewItem}>Add</button>
            </div>
        );
    }
}

export default AddItemBar; 