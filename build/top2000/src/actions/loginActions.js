const axios = require('axios').default;
const URIs = require('../URIs');

export const loginAction = () => {
	return async (dispatch, getState) => {

		dispatch({type: "LOGIN_STATUS_SET", status: "loading"})

		const state = getState().login;

		const {username} = state;
		const {password} = state;

		try {
			const response = (await axios.get(`${URIs.api}users/${username}/login?password=${password}`)).data;
			if (response.success) {
				dispatch({type: "LOGIN_SUCCESSFUL", data: response.data})
				dispatch({type: "LOGIN_MESSAGE_SET", message: {for: '', message: ''}});
			} else {
				dispatch({type: "LOGIN_MESSAGE_SET", message: response.message});
			}
		} catch (err) {
			dispatch({type: "LOGIN_MESSAGE_SET", message: err.response.data.message});
		}

		dispatch({type: "LOGIN_STATUS_SET", status: "loaded"})
	}
}