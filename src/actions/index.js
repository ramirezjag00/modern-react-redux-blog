import axios from 'axios';

//define action type in const
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

//define these 2 things outside the action creator since we're gonna use it on different files

//define the root url 
const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
//define api key, any string and make sure to use "?" since it is a query. it doesn't need to be registered beforehand but it just have to be unique
const API_KEY = '?key=3n8tnyaq1234567890'

//define action creator, we'll make the request and then return the request as the payload from our action
export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	//define the action type and payload
	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

	return {
		type: CREATE_POST,
		payload: request
	};
}

//fetchPost using ID
export function fetchPost(id) {
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type: FETCH_POST,
		payload: request
	};
}

//delete action creator...no need for a reducer
export function deletePost(id) {
	const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);
	return {
		type: DELETE_POST,
		payload: request
	};
}