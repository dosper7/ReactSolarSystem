import actionTypes from '../actions.js';
import { produce } from 'immer';

const initSate = {
    currentPlanetContext: null,
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
        }]
    }],
};

const reducer = (state = initSate, action) => {
    switch (action.type) {

        case actionTypes.ADD_NEW_PLANET:
            return produce(state, draft => {
                action.newPlanet.id = Date.now();
                draft.planets.push(action.newPlanet);
            });

        case actionTypes.DELETE_PLANET:
            return produce(state, draft => {
                draft.planets = draft.planets.filter(p => p.id !== action.planet.id);
                draft.currentPlanetContext = null;
            });
        case actionTypes.EDIT_PLANET:
            return produce(state, draft => {
                const idx = draft.planets.findIndex(p => p.id === action.editedPlanet.id);
                draft.planets[idx] = action.editedPlanet;
            });

        case actionTypes.SORT_PLANETS:
            return produce(state, draft => {
                draft.planets = draft.planets.reverse();
            });

        case actionTypes.SHOW_MOON_INFO:
            return produce(state, draft => {
                draft.currentPlanetContext = action.planet;
            });
        case actionTypes.ADD_NEW_MOON:
            return produce(state, draft => {
                const idx = draft.planets.findIndex(p => p.id === draft.currentPlanetContext.id);
                let moons = draft.planets[idx].moons || [];
                action.newMoon.id = Date.now();
                moons.push(action.newMoon);
                draft.planets[idx].moons = draft.currentPlanetContext.moons = moons;
            });
        case actionTypes.DELETE_MOON:
            return produce(state, draft => {
                let planet = draft.currentPlanetContext;
                const idx = draft.planets.findIndex(p => p.id === planet.id);
                const moons = planet.moons.filter(m => m.id !== action.moon.id);
                planet.moons = draft.planets[idx].moons = moons;
            });
        case actionTypes.EDIT_MOON:
            return produce(state, draft => {
                const moonIdx = draft.currentPlanetContext.moons.findIndex(m => m.id === action.moon.id);
                const planetIdx = draft.planets.findIndex(p => p.id === draft.currentPlanetContext.id);
                draft.currentPlanetContext.moons[moonIdx] = draft.planets[planetIdx].moons[moonIdx] = action.moon;
            });
        default:
            return state;
    }
}

export default reducer;