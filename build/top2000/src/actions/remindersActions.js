const axios = require('axios').default;
const URIs = require('../URIs');

export const remindersGet = () => {
	return async (dispatch) => {
		dispatch({
			type: "REMINDERS_STATUS_SET",
			status: "loading"
		})

		try {
			const songs = (await axios.get(`${URIs.api}users/${sessionStorage.username}/reminders/songs`)).data;

			dispatch({
				type: "REMINDERS_LOADED",
				songs: songs.data,
			});
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "loaded"
			})
		} catch (err) {
			console.log(err);
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "failed"
			});
		}
	}
}

export const remindersAdd = (reminder) => {
	return async (dispatch) => {
		dispatch({
			type: "LIST_STATUS_SET",
			status: "loading"
		})
		dispatch({
			type: "REMINDERS_STATUS_SET",
			status: "loading"
		})

		try {
			const songs = (await axios({
				method: 'post',
				url: `${URIs.api}users/${sessionStorage.username}/reminders`,
				data: [{
					id: reminder
				}]
			})).data;

			dispatch({
				type: "LIST_STATUS_SET",
				status: "unloaded"
			})
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "unloaded"
			})
		} catch (err) {
			dispatch({
				type: "LIST_STATUS_SET",
				status: "failed"
			});
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "failed"
			});
		}
	}
}

export const remindersRemove = (reminder) => {
	return async (dispatch) => {
		dispatch({
			type: "LIST_STATUS_SET",
			status: "loading"
		})
		dispatch({
			type: "REMINDERS_STATUS_SET",
			status: "loading"
		})

		try {
			const songs = (await axios({
				method: 'delete',
				url: `${URIs.api}users/${sessionStorage.username}/reminders`,
				data: [{
					id: reminder
				}]
			})).data;

			dispatch({
				type: "LIST_STATUS_SET",
				status: "unloaded"
			})
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "unloaded"
			})
		} catch (err) {
			dispatch({
				type: "LIST_STATUS_SET",
				status: "failed"
			});
			dispatch({
				type: "REMINDERS_STATUS_SET",
				status: "failed"
			});
		}
	}
}