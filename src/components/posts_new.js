
import React, {Component} from 'react';
//Field is a react component wired up automatically on redux-form
//reduxForm is nearly identical to connect function from react-redux library.
//we'll be using this function to wrap our postsnew component at the export default
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
	//this field object contains some event handlers that we need to wire up to the JSX that we're returning
	
	//{...field.input}
	//this is an object....all diff properties on this input field will be communicating as props on this input

	//Field component is used to represent distinct input that will be visible on the screen to our users, we specify the name property, to specify what piece of state this property is going to produce

	//component property, we are defining this prop bec we want control how will it appear on the screen
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
		
		this.props.createPost(values, () => {
			//take me back to index page after submitting
			this.props.history.push('/');
		});	
	}


	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			<h3>Create a new post</h3>
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

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
connect(null, { createPost })( PostsNew )
);