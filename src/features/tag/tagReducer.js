import { combineReducers } from 'redux';

const initialState = {
	tags: []
};

const tagReducer = (state = initialState, action) => {
	
	switch (action.type) {
		
		case 'ADD_TAG':
		
		return { ...state,  tags: [ ...state.tags, action.data ]};
		
		default:
		
		return state;
	}
}

export default combineReducers({ tagReducer });