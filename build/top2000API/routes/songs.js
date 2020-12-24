const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const {
	sendStatus,
	getSongs,
	currentSong,
	upcomingSongs
} = require('./restFunctions');

const URIs = require('./URIs');

// get songs
router.get('/', async (req, res) => {
	const reqLimit = req.query.limit;
	const limit = (reqLimit !== undefined && reqLimit.match(/^\d+$/)) ? reqLimit : undefined;

	const reqSearch = req.query.search;
	const search = (reqSearch === undefined || reqSearch.length===0) ? undefined : String(reqSearch);

	try {
		let songs = await getSongs({limit, search});

		if (search !== undefined) {
			songs = songs.filter((song) => {
				return (song.s.toLowerCase()).includes(search) || (song.a.toLowerCase()).includes(search) || song.pos == search;
			})
		}

		// console.log(songs);

		res.json({success: true, queryCount: songs.length, songs: (limit) ? songs.splice(0, limit) : songs});
		// res.json({success: true, queryCount: songs.length, songs: songs});
	} catch (err) {
		console.log(err);
		sendStatus(res, 500, err);
	}
})

router.get('/playing', async (req, res) => {
	try {
		const playing = await currentSong();

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
		const streamInfo = (await axios.get("https://start-player.npo.nl/video/LI_RADIO2_300879/streams?profile=dash-widevine&quality=npo&tokenId=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VFbmNyeXB0aW9uIjoiZHJtIiwiZWxlbWVudElkIjoibnBvXzVmZTBiYzNlN2ViZWUiLCJhdXRvcGxheSI6IjAiLCJzaGFyZSI6IjAiLCJoYXNBZENvbnNlbnQiOiIwIiwic21hcnR0YWciOnsic2l0ZUlkIjoiMzMifSwiaWF0IjoxNjA4NTYzNzc0LCJuYmYiOjE2MDg1NjM3NzQsImV4cCI6MTYwODU5MjU3NCwiY29uc3VtZXJJZCI6IjQ1MGM5NjQ5LWMxNzktNGZmZi04NTM3LTBjNGMzYTcyYTljMyIsIm1lZGlhSWQiOiJMSV9SQURJTzJfMzAwODc5IiwiaXNQbGF5bGlzdCI6ZmFsc2UsInJlZmVycmVyVXJsIjpudWxsLCJza2lwQ2F0YWxvZyI6MCwibm9BZHMiOjAsInJlY29tbWVuZGF0aW9ucyI6MSwiaXNzIjoiZXlKcGRpSTZJa1oxYlRCS01HUlBaR3B5TUVSVGVWRmFWV2hOZDBFOVBTSXNJblpoYkhWbElqb2lNVmhhYVRWb2RXUmNMMXBNTnpVM1VXeDNWVXRSTm1RMmEzUlFkM1J0VEVkd1YxUmtWRVJTVHpaa2VWSkRRMHBxUlVsWUt6azFkMnRZYmpKbmFUbG1kRllpTENKdFlXTWlPaUl6TVdZeU5UVXdaVFptT0RFM1lUVmlOVFpqWWpCbU4yUXhZamN3TURZNVl6azVOR0V4TlRNNE5qbGxOV0l5TlRBek5URXpZV1ZsWmpnNVlXWTFZVGMzSW4wPSJ9.cm7BbToGj_7xXP2XM2TPfs0d62QFHgE5S7xLkf3mQHs&streamType=liveradio&mobile=0&ios=0&isChromecast=0&isYospace=0")).data
		res.status(200).json({
			success: true,
			stream: streamInfo.stream,
			metadata: streamInfo.metadata
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/upcoming', async (req, res) => {
	try {
		const upcoming = await upcomingSongs();

		if (upcoming.length===0) return sendStatus(res, 404, "De top2000 is nog niet begonnen.");

		res.status(200).json(upcoming);
	} catch (err) {
		sendStatus(res, 500, err);
	}
	
})

module.exports = router;