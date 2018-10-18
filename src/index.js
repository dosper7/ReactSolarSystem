import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import SolarSystem from './containers/SolarSystem';
import planetReducer from './store/reducers/planetsReducer'

//TODO: refactor later to add moons reducer
// const rootReducer = combineReducers({
//    planets : planetReducer,
//    moons: moonsReducer 
// });

const store = createStore(planetReducer);

ReactDOM.render(<Provider store={store}><SolarSystem /></Provider>, document.getElementById('root'));

