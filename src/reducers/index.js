import { combineReducers } from 'redux';
//import reducer and make is as var = formReducer from redux-form
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
	posts: PostsReducer,
	form: formReducer
});

export default rootReducer;
