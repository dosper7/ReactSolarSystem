import React from 'react';

const FilterItem = (props) => {

    const onFilterChangeValue = (e) => {
        props.onTextChange(e.target.value);
    };

    return (
        <div className="form-inline col-sm-6">
            <div className="col">
                <input type="text" className="form-control" placeholder="Filter" onChange={onFilterChangeValue} />
            </div>
        </div>
    );

}

export default FilterItem; 