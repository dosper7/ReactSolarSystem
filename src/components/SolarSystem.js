import React from 'react';
import Planet from './Planet';

const SolarSystem = (props) => {

    const planets = props.planets && props.planets.map(p =>
        <Planet
            key={p.id}
            planet={p}
            onPlanetEdit={props.onPlanetEdit}
            onDelete={props.onPlanetDelete}
            onPlanetEditInfo={props.onPlanetEditInfo} />);

    return (
        <div >
            <h1 >Solar System</h1>
            {props.children}
            <table className="table table-bordered" >
                <thead>
                    <tr>
                        <th onClick={props.onPlanetSort}>
                            <i className="glyphicon glyphicon-sort ms"></i>
                            Planet Name
                        </th>
                        <th >Info</th>
                        <th >Moons</th>
                    </tr>
                </thead>
                <tbody>
                    {planets}
                </tbody>
            </table>
        </div>

    );
}

export default SolarSystem; 