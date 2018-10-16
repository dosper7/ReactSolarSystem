import React from 'react';

const SpaceObject = (props) => {
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                {props.info}
                <a href="#" className="badge badge-pill badge-info" onClick={props.onDetailsClick}>{props.childSpaceObjects ? props.childSpaceObjects.length:"0"}</a>
            </td>
            <td>
                <button className="btn btn-link btn-xs" onClick={props.onEditClick}>Edit</button>
                <button className="btn btn-link btn-xs" onClick={props.onClickDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default SpaceObject; 