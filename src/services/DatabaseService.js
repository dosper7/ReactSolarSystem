let WebDB = {
    DB: null,
    ConnectDB() {
        var dbSize = 5 * 1024 * 1024; // 5MB default value
        this.DB = openDatabase("SolarSystem", "v1", "Manage Planets and Moons on the Solar System", dbSize);
    },
    CreateTables() {

        //planets
        this.DB.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Planets(ID INTEGER PRIMARY KEY ASC, name TEXT, info TEXT)", []);
        });

        //moons
        this.DB.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Moons(ID INTEGER PRIMARY KEY ASC, name TEXT, info TEXT, planetId INTEGER)", []);
        });
    },
    ExecuteTransaction(query, args) {
        this.DB.transaction(function (tx) {
            tx.executeSql(query, args);
        });
    }
}

const API = {
    initDB: () => {
        WebDB.ConnectDB();
        WebDB.CreateTables();
    },

    async getPlanets() {
        return new Promise((resolve) =>{
            WebDB.DB.transaction(tx => {
                tx.executeSql('SELECT * FROM Planets', [], (ts, data) => {
                    var planets=[];
                    for(var i=0; i<data.rows.length; i++) {
                        var row = data.rows.item(i)
                        planets.push({
                            id:row['ID'],
                            info:row['info'],
                            name:row['name'],
                        });
                     }
                     resolve(planets);
                })
            });
        });
    },
    addPlanet: (planet) => {
        WebDB.ExecuteTransaction('INSERT INTO Planets (id,name, info) VALUES (?,?,?)', [planet.id,planet.name, planet.info]);
    },

    updatePlanet: (planet) => {
        WebDB.ExecuteTransaction('UPDATE Planets SET name=?, info=? WHERE id=?', [planet.name, planet.info, planet.id]);
    },

    deletePlanet: (planet) => {
        WebDB.ExecuteTransaction('DELETE FROM Planets WHERE id = ?', [planet.id]);
    },

    getPlanet: (id) => {
        WebDB.ExecuteTransaction('INSERT INTO Planets (id, info) VALUES (?,?)', [id]);
    },

    addMoon: (moon) => {
        WebDB.transaction(function (tx) {
            tx.executeSql('INSERT INTO Moons (id, info) VALUES (?,?)', [moon.id, moon.info, moon.planetId]);
        });
    },

    updateMoon: (planet) => {
        WebDB.ExecuteTransaction('INSERT INTO Planets (id, info) VALUES (?,?)', [planet.id, planet.info]);
    },
    deleteMoon: (moon) => {
        WebDB.ExecuteTransaction('INSERT INTO Planets (id, info) VALUES (?)', [moon.id]);
    },
    getMoon: (id) => {
        WebDB.ExecuteTransaction('INSERT INTO Planets (id, info) VALUES (?,?)', [id]);
    },
}


export default API;