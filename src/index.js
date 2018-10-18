import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import SolarSystem from './containers/SolarSystem';
import reducer from './store/reducers/reducer.js'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><SolarSystem /></Provider>, document.getElementById('root'));

