const initialtSate = {
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

export default initialtSate;