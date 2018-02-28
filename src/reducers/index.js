import { combineReducers } from 'redux';
//import reducer_posts.js
import PostsReducer from './reducer_posts';
//import reducer and make is as var = formReducer from redux-form
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  //pass through a state with posts : posts reducer
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
