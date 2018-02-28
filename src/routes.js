// routes.js essentially our mapping of tool...for this URL please show this and that component
//where we house all our mapping between path and component

import React from 'react';
//Route obj is what we're going to use to define a match between a URL and a component 
//the IndexRoute is a helper that behaves like a route but it will be shown whenever the URL matches up with a path defined by the parent but not one of the chidren
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
//import postsIndex from components/posts_index.js
import PostsIndex from './components/posts_index';
//import PostsNew
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

//so this matches the path of forward slash or the root to the component of "App"
//Whenever the user is at this path "website.com/", show/render this component "App"

//export this to root index.js so we could use it
//and call these children Route(s) since this is a nested route in the components/app.js
export default (
<Route path="/" component={App}>
{/*the index route has component postsIndex but it doesn't need a path...
if the route is "/", show ap and show posts index..
*/}
	<IndexRoute component={PostsIndex} />
{/*if posts/new is the path, show PostsNew component*/}
	<Route path="posts/new" component={PostsNew} />
{/*show route with the /:id which represents the id of a post*/}
	<Route path="posts/:id" component={PostsShow} />
</Route>
);