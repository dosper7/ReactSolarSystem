import actionTypes from '../actions.js';
import {
    produce
} from 'immer';

const initSate = {
    planets: [{
            id: 1,
            name: 'Earth',
            info: 'the blue planet',
            moons: [{
                id: 1,
                name: 'Hunter\'s Moon',
                info: 'moon in october',
                planetId: 1
            }]
        },
        {
            id: 2,
            name: 'Mercury',
            info: 'the red planet',
            moons: [{
                    id: 2,
                    name: 'Snow moon',
                    info: 'moon in february',
                    planetId: 2
                },
                {
                    id: 3,
                    name: 'Pink Moon',
                    info: 'moon in march',
                    planetId: 2
                }
            ]
        }
    ],
};

const reducer = (state = initSate, action) => {
debugger;
    switch (action.type) {

        case actionTypes.ADD_NEW_PLANET:
            return produce(state, draftState => {
                action.newPlanet.id = Date.now();
                draftState.planets.push(action.newPlanet);
            });

        case actionTypes.DELETE_PLANET:
            return produce(state, draftState => {
                draftState.planets.slice(action.id, 1);
            });
        case actionTypes.EDIT_PLANET:
            return produce(state, draftState => {
                draftState.planets = draftState.planets.map((item, index) => {
                    if (item.id !== action.editedPlanet.id) {
                        return item;
                    }
                    return {
                        ...item,
                        ...action.editedPlanet
                    };
                });
            });

        case actionTypes.SORT_PLANETS:
            return produce(state, draftState => {
                draftState.planets = draftState.planets.reverse();
            });

        case actionTypes.ADD_NEW_MOON:
        
            return produce(state, draftState => {
                const idx = draftState.planets.findIndex(p => p.id === action.newMoon.planetId);
                let moons =  draftState.planets[idx].moons;
                moons.push(action.newMoon);
                draftState.planets[idx].moons = moons;
            });

        case actionTypes.DELETE_MOON:
            return produce(state, draftState => {

            });
        case actionTypes.EDIT_MOON:
            return produce(state, draftState => {

            });
        default:
            return state;
    }
}

export default reducer;