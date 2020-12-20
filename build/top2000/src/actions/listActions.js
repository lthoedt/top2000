const axios = require('axios').default;
const URIs = require('../URIs');

export const songsGet = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: "LIST_STATUS_SET",
			status: "loading"
		});

		const state = getState();

		try {
			const songs = (await axios.get(`${URIs.api}/songs?limit=${state.list.loadedSongs}&search=${state.list.search}`));
			const reminders = (await axios.get(`${URIs.api}users/${sessionStorage.username}/reminders/songs`)).data;

			dispatch({
				type: "LIST_LOADED",
				songs: songs.data.songs,
				reminders: reminders.data,
				queryCount: songs.data.queryCount
			});
			dispatch({
				type: "LIST_STATUS_SET",
				status: "loaded"
			})
		} catch (err) {
			console.log(err);
			dispatch({
				type: "LIST_STATUS_SET",
				status: "failed"
			});
		}
	}
}