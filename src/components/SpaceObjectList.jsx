import React from 'react';

const SpaceObjectList = (props) => {

  return (
    <React.Fragment>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={props.onSortSpaceObject}>
              <i className="fas fa-sort"></i>Planet Name</th>
            <th>Info</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {props.spaceObjects}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default SpaceObjectList

