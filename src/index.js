import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//BrowserRouter is what interacts with a history library and decides what to do based on the URL. basically says, I want browserRouter to look entirely on the URL on deciding what components to show on the screen

//Route, is the real work course of the react router, this is the react component that can render inside in any other react component that we put together inside the react app, the purpose of the route component is to provide the configuration that will say hey, if the url looks like this then i wanna show, this component and if the url looks like that I wanna show that component. it provides the customization or the configuration to react-router
//the SWITCH component takes in a collection of diff routes. and matches the first route then show its component. best practice is to put most specific routes above the "/" route
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
	  	<div>
	  	<Switch>
	  		{/*path is an attribute that gets the url and works with the component attribute to show that component*/}
	  		<Route path="/posts/new" component={PostsNew} />
	  		<Route path="/posts/:id" component={PostsShow} />
	  		<Route path="/" component={PostsIndex} />
	  	</Switch>
	  	</div>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('.container'));