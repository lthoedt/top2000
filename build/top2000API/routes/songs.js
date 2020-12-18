const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const {sendStatus} = require('./restFunctions');

const URIs = require('./URIs');

// get songs
router.get('/', async (req, res) => {
	const reqLimit = req.query.limit;
	const limit = (reqLimit!==undefined && reqLimit.match(/^\d+$/)) ? reqLimit : undefined;

	try {
		const songs = (await axios.get(URIs.songs())).data.data[0];
		res.json((limit) ? songs.splice(0, limit) : songs);
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

module.exports =  router;
