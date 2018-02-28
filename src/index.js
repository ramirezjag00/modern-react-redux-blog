import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//remove import app and instance of app, and import router and browserHistory object
//Router is what decides what we need to render when the URL Changes
//browserHistory is an obj that tells react router how to interpret changes to the URL
import { Router, browserHistory } from 'react-router';
// import App from './components/app';

import reducers from './reducers';
//import routes
import routes from './routes';
import promise from 'redux-promise';

//define promise in applyMiddleware
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//in the router JSX, define routes={routes},,, to declare that this is the mapping between the URLs and the components
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
