//this is going to serve as the center of our index route for showing blog posts to the user

import React, { Component } from 'react';

//import connect, bindActionCreators and fetchPosts, part of the processfor creating a container that can call action creators
import {connect} from 'react-redux';
// import {bindActionCreators} from '../actions/index';
import {fetchPosts} from '../actions/index';
//a react-router component used to link a component from one route to another
import { Link } from 'react-router';

class PostsIndex extends Component {
	//whenever postsIndex is is about to be rendered, componentWillMount is automatically called by react.
	//this is a react lifecycle method.
	//this is called when our component is about to be rendered for the 1st time.
	//this is the way to get our app to call an action creator to fetch data whenever the list of blog posts is displayed to the user
	componentWillMount() {
		this.props.fetchPosts();
	}


	//use posts from mapStateToProps to get list of posts
	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				/*the key is required whenever we render a list with react as the key woll go ahead and use the post. so the post.id remember this id is coming from the backend so the back end generates the id and it passes down to us*/

				<li className="list-group-item" key={post.id}>
				<Link to={"posts/" + post.id}>
					<span className="pull-xs-right">{post.categories}</span>
					<strong>{post.title}</strong>
				</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
			{/*link component as JSX like anchor tag and "to" attribute is like href, inspect it on dev tools...*/}
					<Link to="posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
			<h3>Posts</h3>
			<ul className="list-group">
				{/*all posts*/}
				{this.renderPosts()}
			</ul>
			</div>
			);
	}
}

function mapStateToProps(state) {
	//posts are available at state.posts.all
	return { posts: state.posts.all };
}

// function mapDispatchToProps(dispatch) {
// 	//bindActionCreators fetchPosts gives us access to this props fetchPosts
// 	return bindActionCreators({ fetchPosts }, dispatch);
// }
//usually mapStateToProps method is used but we're not there yet, so make it "null"
// export default connect(null, mapDispatchToProps)(PostsIndex);
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);