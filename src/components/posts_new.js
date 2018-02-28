import React, {Component, PropTypes} from 'react';
//this is nearly identical to connect function from react-redux library.
//we'll be using this function to wrap our postsnew component at the export default
import { reduxForm } from 'redux-form';
//import createPost action
import { createPost } from '../actions/index';
import { Link } from 'react-router';

/*
ADD POST SUMMARY

to navigate our app programmatically w/o a link tag we need to access to react router, which is available to all components inside of our application through the context property. to get access to react router, we had to define a context type:

	static contextTypes = {
		router: PropTypes.object
	};

this tells react, that we want to access this property from a parent component. We then pulled the submission action out to a separate helper function right here called onSubmit.

We called our action creator, createPost, which returned a promise and then we changed on to that with  a ".then",

so this inner function right here is only called when the blog post is successfully created. 

once the blog post is successfully created, we called our router with this.context.router.push and we added a new path for the router to automatically navigate over to.

In this case "/" represents the indexpage, so our user gets navigated back to our index page, whenever the blog post is successfully created, that's it.
*/

class PostsNew extends Component {
	//this is just giving us access to this.context.router
	//we only have to use context when we are using router right here.
	static contextTypes = {
		router: PropTypes.object
	};

	//pass on the properties of the form along with this.props.createPost action creator function, this is made since we will be using this on onSubmit
	onSubmit(props) {
		this.props.createPost(props)
			.then(() => { 
				//blog post has been created, navigate the user to the index
				//we navigate by calling this.context.router.push with
				//the new path to navigate to
				this.context.router.push('/');
			});
	}

	render() {
		//reduxForm is injecting some helper's for us onto this stop props inside of thiss component here. basically working as a "connect"
		//handleSubmit gives the forms final values and pass it on actioncreator to this and the action creator will be called for the final values
		//same as const title = this.props.fields.title or categories or content
		const { fields:{title,categories,content}, handleSubmit } = this.props;



		//const handleSubmit = this.props.handleSubmit;
		return (
			//handleSubmit reduxform function - the user is trying to submit this form now, validate form and if invalid, stop validation
			//pass the createPost props to handleSubmit
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new post</h3>
			{/*we're using template string here then ternary. if title.touched and invalid, put in has-danger or else nothing*/}
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
				{/*pass the props here on this input "...{title}"*/}
					<input type="text" className="form-control" {...title}/>
				{/*where error will show up as we tied up using validate function to reduxForm, touched is a function to know if the user has clicked on the form and didn't do anything then show error or not. if form is invalid, form will not submit*/}
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea type="text" className="form-control" {...content}/>
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
			);
	}
}

//form validation
//declare on reduxForm
//use it inside the form
function validate(values) {
	const errors = {};

	if(!values.title) {
		errors.title = 'Enter a title';
	}
	if(!values.categories) {
		errors.categories = 'Enter categories';
	}
	if(!values.content) {
		errors.content = 'Enter some content';
	}

	return errors;
}

//user types somethin in...record it on application state
//user types in something on component level, and pulls it up on the global application state
//redux form has the exact same behavior as the connect redux form, which can be used to inject our action creators into our component and create a container out of our component right here
//the difference between redux form and connect is that redux form has one additional argument to it

//connect: first agument mapStateProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	//name the form
	//name could be different from the component
	//it just have to be a unique token
	form: 'PostsNewForm',
	//define the array of fields/pieces of data that the form is gonna contain.
	//to tell redux-form that it needs to create some configuration for these, to watch for these inputs
	//add validate function to validate fields
	fields: ['title', 'categories', 'content'],
	validate	
}, null, { createPost })( PostsNew );