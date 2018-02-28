//import action type
import {FETCH_POSTS, FETCH_POST} from '../actions/index';
//define initial state (application state)
//all = array/list of posts and post with default null show page
const INITIAL_STATE =  { all: [], post: null};

//single function for actual reducer, and contains a switch statement for all the different types of actions that we have flowing through
//two reminders first with redux promise and axios, the data that we care about is going to be available on action.payload.data, and second, our reducer needs to return a new object whenever we return our state
export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_POST:
			return { ...state, post: action.payload.data };
		case FETCH_POSTS:
			return { ...state, all: action.payload.data };
		default:
		return state;
	}
}

