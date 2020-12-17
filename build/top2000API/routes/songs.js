const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const {sendStatus} = require('./restFunctions');

const URIs = require('./URIs');

// get songs
router.get('/', async (req, res) => {
	try {
		const songs = (await axios.get(URIs.songs())).data.data[0];
		res.json(songs.splice(0, 10));
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

module.exports =  router;
