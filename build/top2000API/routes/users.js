const express = require('express');
const router = express.Router();

const {
	Users
} = require('../database/db');

const axios = require('axios').default;

const {
	sendStatus
} = require('./restFunctions');

const URIs = require('./URIs');

// get songs
router.post('/', async (req, res) => {
	const username = req.query.username;
	const email = req.query.email;
	const password = req.query.password;

	try {

		if (!emailIsValid(email)) return sendStatus(res, 400, {type: "email", message: "Not a valid email"});

		if (!usernameIsValid(username)) return sendStatus(res, 400, {type: "username", message: "Not a valid username"});

		if (await accountExists(username)) return sendStatus(res, 409);

		new Users({
			username: username,
			password: password,
			email: email
		}).save();


		sendStatus(res, 200);
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/:USERNAME', async (req, res) => {
	const username = req.params.USERNAME;

	try {
		const user = (await Users.findOne({username: username}, {_id: 0, __v: 0, password: 0}));
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

const accountExists = async (username) => {
	return (await Users.countDocuments({
		username: username
	})) > 0;
}

const emailIsValid = (email) => {
	return email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/) !== null;
}

const usernameIsValid = (username) => {
	return username.match(/^[a-zA-Z0-9-_]*$/) !== null;
}

module.exports = router;