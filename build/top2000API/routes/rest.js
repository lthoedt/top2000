const express = require('express');
const router = express.Router();

const route_songs = require('./songs');
const route_users = require('./users');
const route_mails = require('./mails');

router.use("/songs", route_songs);
router.use("/users", route_users);
router.use("/mails", route_mails);

module.exports = router;