import actionTypes from '../actions.js';

const initSate = {
    planets: [{
            id: 1,
            name: 'Earth',
            info: 'the blue planet',
            moons: [{
                    id: 'moon1',
                    info: 'the white moon'
                },
                {
                    id: 'moon2',
                    info: 'the wuaha moon'
                }
            ]
        },
        {
            id: 2,
            name: 'Mercury',
            info: 'the red planet',
            moons: [{
                id: 'moon',
                info: 'the big moon'
            }]
        }
    ],
};

const reducer = (state = initSate, action) => {

    let planets = [...state.planets];
    switch (action.type) {

        case actionTypes.ADD_NEW_PLANET:
            action.newPlanet.id = Date.now();
            planets.push(action.newPlanet);
            return {
                ...state,
                planets
            };

        case actionTypes.DELETE_PLANET:
            planets.slice(action.id,1);

            return {
                ...state,
                planets
            };

        case actionTypes.EDIT_PLANET:

        planets = state.planets.map((item, index) => {
                if (item.id !== action.editedPlanet.id) {
                    return item;
                }
                return {
                    ...item,
                    ...action.editedPlanet
                };
            });

            return {
                ...state,
                planets: planets
            };

        case actionTypes.SORT_PLANETS:
            const sortedPlanets = [...state.planets].reverse();
            return {
                ...state,
                planets: sortedPlanets,
            }

        default:
            return state;
    }
}

export default reducer;