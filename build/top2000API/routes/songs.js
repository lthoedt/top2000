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

module.exports = router;