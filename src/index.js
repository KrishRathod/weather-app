//add core.js to support map array method for old browsers
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/library/es6/map';

//React also depends on requestAnimationFrame (even in test environments) add raf polyfill
import 'raf/polyfill';

// react polyfill to get async/await and fetch to work for IE browsers
import "babel-polyfill";
import "isomorphic-fetch";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
