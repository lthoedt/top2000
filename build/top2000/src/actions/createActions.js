const axios = require('axios').default;
const URIs = require('../URIs');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

export const createAction = () => {
	return async (dispatch, getState) => {

		const state = getState().create;

		const {username} = state;
		const {password} = state;
		const {password2} = state;
		const {email} = state;

		if (password!==password2) return dispatch({type: "CREATE_MESSAGE_SET", message: { for: "password", message: "Wachtwoorden zijn niet hetzelfde." }})

		const salt = bcrypt.genSaltSync(saltRounds);
		const passwordHash = bcrypt.hashSync(password, salt);

		try {
			const response = (await axios.post(`${URIs.api}/users?username=${username}&email=${email}&password=${passwordHash}`)).data;
			if (response.success) {
				dispatch({type: "CREATE_SUCCESSFUL"})
				dispatch({type: "CREATE_MESSAGE_SET", message: {for: '', message: ''}});
			} else {
				dispatch({type: "CREATE_MESSAGE_SET", message: response.message});
			}
		} catch (err) {
			dispatch({type: "CREATE_MESSAGE_SET", message: err.response.data.message});
		}


	}
}