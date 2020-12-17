const axios = require('axios').default;
const URIs = require('../URIs');

export const songsGet = () => {
	return async (dispatch) => {
		dispatch({
			type: "LIST_STATUS_SET",
			status: "loading"
		});

		try {
			const songs = (await axios.get(`${URIs.api}/songs`));

			dispatch({
				type: "LIST_LOADED",
				songs: songs.data
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: "LIST_STATUS_SET",
				status: "failed"
			});
		}
	}
}