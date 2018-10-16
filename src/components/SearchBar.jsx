import React from 'react';

const SearchBar = (props) => {

    const onFilterChangeValue = (e) => {
        props.onTextChange(e.target.value);
    };

    return (
        <div className="form-group col-sm-6">
            <label>Search:</label>
            <input type="text" className="form-control" placeholder={props.placeHolderHint} onChange={onFilterChangeValue} />
        </div>
    );

}

export default SearchBar; 