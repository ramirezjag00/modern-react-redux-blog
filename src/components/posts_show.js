import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';


class PostsShow extends Component {
	componentDidMount() {
		//for network purposes, if the post isn't loaded yet on the browser, load it
		if(!this.props.post) {
			const {id} = this.props.match.params;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick() {
		const {id} = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push("/");
		});
	}

	render() {
		//this.props === ownProps
		const { post } = this.props;

		if(!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<Link to={`/posts/${post.id}/edit`}
					className="btn btn-warning pull-xs-right"
				>
				Edit Post
				</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
				Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	};
}

function mapStateToProps({posts}, ownProps) {
	return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);