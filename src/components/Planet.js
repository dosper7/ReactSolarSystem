import React from 'react';
import Moon from './Moon';

const Planet = ({ planet, onPlanetEditInfo, onEditMoon, onDeleteMoon, onDelete }) => {

    const moons = planet.moons && planet.moons.map(moon => <Moon key={moon.id} moon={moon} onEdit={() => onEditMoon(moon)} onDelete={() => onDeleteMoon(moon)} />);

    return (
        <tr>
            <td>
                {planet.name}
                <p>
                    <button className="btn btn-link btn-xs"
                        onClick={() => onPlanetEditInfo(planet)}>Add Moon</button>
                    <button className="btn btn-link btn-xs"
                        onClick={() => onDelete(planet)}>Delete Planet</button>
                </p>
            </td>
            <td>
                {planet.info}
                <p>
                    <input placeholder="change info" type="text" onBlur={(e) => onPlanetEditInfo(e,planet)} />
                </p>
            </td>
            <td>
                <div>
                    {moons}
                </div>
            </td>

        </tr>

    );
}

export default Planet; 