import React from 'react';
import WithGroupItem from '../hoc/WithGroupItem';

const SpaceObjectList = (props) => {

const items=[
  props.spaceObjectName,
  "Info",
  "#"
];

  return (
    <div className="list-group">
      <WithGroupItem groupItems={items} active={true} />
      {props.spaceObjects}
    </div>
  );
}

export default SpaceObjectList

