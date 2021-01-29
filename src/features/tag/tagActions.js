export const addTag = (tag) => {
	return function(dispatch) {
		return dispatch({
			type: 'ADD_TAG',
			data: tag
		});
	}
}