import actionTypes from '../actions.js';

const initSate = {
    moons: [{
            id: 1,
            name: 'Hunter\'s Moon',
            info: 'moon in october',
            planetId: 1
        },
        {
            id: 1,
            name: 'Snow moon',
            info: 'moon in february',
            planetId: 2
        },
        {
            id: 1,
            name: 'Pink Moon',
            info: 'moon in march',
            planetId: 2
        }
    ],
};

const reducer = (state = initSate, action) => {
    return {
        state
    }
}

export default reducer;