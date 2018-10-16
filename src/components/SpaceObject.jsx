import React from 'react';

const SpaceObject = (props) => {
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                <p>
                    {props.info}
                </p>
                <a href="#" className="badge badge-pill badge-info" onClick={props.onDetailsClick}>{props.childSpaceObjects ? props.childSpaceObjects.length : "0"} Moons</a>
            </td>
            <td>
                <button className="mr-2 btn btn-outline-info btn-xs" onClick={props.onEditClick}>Edit</button>
                <button className="mr-2 btn btn-outline-danger btn-xs" onClick={props.onClickDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default SpaceObject; 