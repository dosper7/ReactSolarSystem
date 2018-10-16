import React from 'react';

const SolarSystem = (props) => {


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