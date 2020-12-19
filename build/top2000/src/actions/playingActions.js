const axios = require('axios').default;
const URIs = require('../URIs');

export const playingSongGet = () => {
	return async (dispatch) => {
		dispatch({
			type: "LIST_STATUS_SET",
			status: "loading"
		});
		try {
			const song = (await axios.get(`${URIs.api}/songs/playing`));
			const songStream = (await axios.get(`${URIs.api}/songs/playing/stream`));

			dispatch({
				type: "PLAYING_LOADED",
				song: song.data.song,
				stream: songStream.data.stream
			});
			dispatch({
				type: "PLAYING_STATUS_SET",
				status: "loaded"
			})
		} catch (err) {
			dispatch({
				type: "PLAYING_STATUS_SET",
				status: "failed"
			});
		}
	}
}