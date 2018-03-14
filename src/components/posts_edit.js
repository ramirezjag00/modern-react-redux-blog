
import React, {Component} from 'react';
//Field is a react component wired up automatically on redux-form
//reduxForm is nearly identical to connect function from react-redux library.
//we'll be using this function to wrap our postsnew component at the export default
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchEditPost} from '../actions';

class PostsEdit extends Component {
		componentDidMount() {
		//for network purposes, if the post isn't loaded yet on the browser, load it
		if(!this.props.post) {
			const {id} = this.props.match.params;
			this.props.fetchEditPost(id);
		}
	}
	renderField(field) {
		//destructuring field.meta.error or field.meta.touched
		const { meta: {touched, error} } = field;
		const className=`form-group ? ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
			<label>{field.label}</label>
				<input
				className="form-control"
				type="text" 
				{...field.input}
				/>
				<div className="text-help">
				{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		
		this.props.fetchEditPost(values, () => {
			//take me back to index page after submitting
			this.props.history.push('/');
		});	
	}


	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			<h3>Edit PostTitle</h3>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.title) {
		errors.title = "Enter a title";
	}

	if(!values.categories) {
		errors.categories = "Enter some categories";
	}

	if(!values.content) {
		errors.content = "Enter some content please";
	}

	return errors;
}

function mapStateToProps({posts}, ownProps) {
	return {post: posts[ownProps.match.params.id]};
}

export default reduxForm({
	validate,
	form: 'PostsEditForm'
})(
connect(mapStateToProps, { fetchEditPost })( PostsEdit )
);