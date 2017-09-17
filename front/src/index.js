import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { HashRouter } from 'react-router-dom'
global.jQuery = require('jquery');
require('bootstrap');
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.css';
import App from './App'

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'))
registerServiceWorker()
