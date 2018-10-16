import React from 'react';

const Moon = ({ moon, onEdit, onDelete }) => {    
    return (
        <React.Fragment>
            <div>{moon.info}</div>
            <div>
                <button className="btn btn-link btn-xs" onClick={() => onEdit(moon)}>Edit</button>
                <button className="btn btn-link btn-xs" onClick={() => onDelete(moon)}>Delete</button>
            </div>
        </React.Fragment>
    );
}

export default Moon; 