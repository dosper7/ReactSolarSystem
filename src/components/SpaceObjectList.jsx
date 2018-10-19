import React from 'react';

const SpaceObjectList = (props) => {


  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th onClick={props.onSortSpaceObject}>
            <i className="fas fa-sort"></i>{props.spaceObjectName}</th>
          <th>Info</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {props.spaceObjects}
      </tbody>
    </table>
  );
}

export default SpaceObjectList

