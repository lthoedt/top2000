const express = require('express');
const router = express.Router();

const route_songs = require('./songs');

router.use("/songs", route_songs);

module.exports = router;