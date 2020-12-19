const express = require('express');
const router = express.Router();

const route_songs = require('./songs');
const route_users = require('./users');

router.use("/songs", route_songs);
router.use("/users", route_users);

module.exports = router;