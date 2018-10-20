 const actionTypes = {
     ADD_NEW_PLANET: "ADD_NEW_PLANET",
     EDIT_PLANET: "EDIT_PLANET",
     DELETE_PLANET: "DELETE_PLANET",
     SORT_PLANETS: "SORT_PLANETS",
     ADD_NEW_MOON: "ADD_NEW_MOON",
     EDIT_MOON: "EDIT_MOON",
     DELETE_MOON: "DELETE_MOON",
     SHOW_MOON_INFO: "SHOW_MOON_INFO"
 };

 export default actionTypes;

 export const actionTypeCreators = {
     addNewPlanet: () => {
         return {
             type: actionTypes.ADD_NEW_PLANET
         };
     }
 };
