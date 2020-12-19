const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const {
	sendStatus
} = require('./restFunctions');

const URIs = require('./URIs');

// get songs
router.get('/', async (req, res) => {
	const reqLimit = req.query.limit;
	const limit = (reqLimit !== undefined && reqLimit.match(/^\d+$/)) ? reqLimit : undefined;

	const reqSearch = req.query.search;
	const search = (reqSearch !== undefined || reqSearch.length!==0) ? String(reqSearch) : undefined;

	try {
		let songs = (await axios.get(URIs.songs())).data.data[0];


		if (search !== undefined) {
			songs = songs.filter((song) => {
				return (song.s.toLowerCase()).includes(search) || (song.a.toLowerCase()).includes(search) || song.pos == search;
			})
		}

		res.json({success: true, queryCount: songs.length, songs: (limit) ? songs.splice(0, limit) : songs});
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/playing', async (req, res) => {
	try {
		const playing = (await axios.get(URIs.playing)).data.data[0];

		if (playing.image.length===0) playing.image = "https://zwaremetalen.com/wp-content/uploads/2018/12/46479585_10155986290592215_2147690592409223168_n.png";

		res.status(200).json({
			success: true,
			song: playing
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/playing/stream', async (req, res) => {
	try {
		const streamInfo = (await axios.get("https://start-player.npo.nl/video/LI_RADIO2_300879/streams?profile=dash-widevine&quality=npo&tokenId=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VFbmNyeXB0aW9uIjoiZHJtIiwiZWxlbWVudElkIjoibnBvXzVmZGRlNzg0ODBjMGIiLCJhdXRvcGxheSI6IjAiLCJzaGFyZSI6IjAiLCJoYXNBZENvbnNlbnQiOiIwIiwic21hcnR0YWciOnsic2l0ZUlkIjoiMzMifSwiaWF0IjoxNjA4Mzc4MjQ0LCJuYmYiOjE2MDgzNzgyNDQsImV4cCI6MTYwODQwNzA0NCwiY29uc3VtZXJJZCI6IjQ1MGM5NjQ5LWMxNzktNGZmZi04NTM3LTBjNGMzYTcyYTljMyIsIm1lZGlhSWQiOiJMSV9SQURJTzJfMzAwODc5IiwiaXNQbGF5bGlzdCI6ZmFsc2UsInJlZmVycmVyVXJsIjpudWxsLCJza2lwQ2F0YWxvZyI6MCwibm9BZHMiOjAsInJlY29tbWVuZGF0aW9ucyI6MSwiaXNzIjoiZXlKcGRpSTZJbk5qYUZsSGFIRjFkWG9yTUVkTlVYaFNhMFZYYm5jOVBTSXNJblpoYkhWbElqb2lNakpFYlVGa01IRjBhSGhJTTFabVZEQXdkVmRhVTFGcFpUSTRibEJDVm5SSWRHVmNMMlZxYVRFeVR6RXlUeXRJVldSQlpXYzBkVFZzT0UxTE1FMVNaV2NpTENKdFlXTWlPaUprTnpjek9EWmpNRFV4WWpFeU1HWXpZalF6TkRZMU5XSXdaRFJpWWpOak1XTm1ZMkUzTm1FNU56TTFOREprTTJJMk1UUXpaVGd3TkRoa1ltUTBPRGxtSW4wPSJ9.dfLZVBIVv2IRpKqfJFoq4ZUX9zLBFDY2FHqjJEw_eBE&streamType=liveradio&mobile=0&ios=0&isChromecast=0&isYospace=0")).data

		res.status(200).json({
			success: true,
			stream: streamInfo.stream,
			metadata: streamInfo.metadata
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

module.exports = router;