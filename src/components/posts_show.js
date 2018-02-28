import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	//import PropTypes and define contextTypes, this gives us access to the router.
	static contextTypes = {
		router: PropTypes.object
	};

	//once this component loads, get this.props.params.id
	//which contains the data of a post, can be found in network, xhr preview of chrome dev tools
	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	//eventHandler for delete
	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => { 
				this.context.router.push('/');
			});
	}

	render() {

	const { post } = this.props;
	// const post = this.props.post;


	//if post (this.props.post) is not there yet, show Loading... for a while, else show this.props.post
	if(!post) {
		return <div>Loading...</div>;
	}
	{/*this.props.params.id (post id), params is a parameter URL and since we name paramater ID we, can get it as .id from the routes.js */}
		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger pull-xs-right">
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	
	}
}

//for us to be able to get the data that we passed from the forms and show it in the show page
function mapStateToProps(state) {
	return {post: state.posts.post};
}

//import and define this on the routes file.
export default connect(mapStateToProps, {fetchPost,deletePost})(PostsShow);