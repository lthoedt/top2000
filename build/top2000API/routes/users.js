const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {
	Users
} = require('../database/db');

const axios = require('axios').default;

const {
	sendStatus
} = require('./restFunctions');

const URIs = require('./URIs');
const { json } = require('body-parser');

// get songs
router.post('/', async (req, res) => {
	const username = req.query.username;
	const email = req.query.email;
	const password = req.query.password;

	try {

		if (!emailIsValid(email)) return sendStatus(res, 400, {for: "email", message: "Het lijkt erop dat dit geen valid email is."});

		if (!usernameIsValid(username)) return sendStatus(res, 400, {for: "username", message: "Gebruikersnaam mag alleen letters en cijfers bevatten."});

		if (await accountExists(username)) return sendStatus(res, 400, {for: "username", message: "Gebruikersnaam bestaat al."});

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
		const user = await userGet(username);
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/:USERNAME/login', async (req, res) => {
	const username = req.params.USERNAME;
	const password = req.query.password;

	try {
		const user = await Users.findOne({username: username}, {_id: 0, __v: 0});

		if (bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				success: true,
				data: user
			})
		} else {
			res.status(200).json({
				success: false,
				message: {
					for: 'password',
					message: 'Jouw wachtwoord is fout'
				}
			})
		}
	} catch (err) {
		sendStatus(res, 500);
	}
})

router.post('/:USERNAME/reminders', async (req, res) => {
	const username = req.params.USERNAME;

	let reminders = req.body;

	try {
		reminders = reminders.map(song=>{
			return song.id;
		})
		const result = (await Users.updateOne({username: username}, {
			$addToSet: {reminders: reminders}
		}))

		sendStatus(res, 200);
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.delete('/:USERNAME/reminders', async (req, res) => {
	const username = req.params.USERNAME;

	let reminders = req.body;

	console.log(reminders);

	try {
		reminders = reminders.map(song=>{
			return song.id;
		})

		const result = (await Users.updateOne({username: username}, {
			$pull: {reminders: {$in: reminders}}
		}))

		sendStatus(res, 200);
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/:USERNAME/reminders', async (req, res) => {
	const username = req.params.USERNAME;
	try {
		const user = await userGet(username);

		res.status(200).json({
			success: true,
			data: user.reminders
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/:USERNAME/reminders/songs', async (req, res) => {
	const username = req.params.USERNAME;
	try {
		const allSongs = (await axios.get(URIs.songs())).data.data[0];
		const reminders = (await userGet(username)).reminders;

		const songs = allSongs.filter(song => {
			for ( const reminder of reminders ) {
				if (reminder===song.aid) {
					return true;
				}
			}
			return false;
		})

		res.status(200).json({
			success: true,
			data: songs
		})
	} catch (err) {
		sendStatus(res, 500, err);
	}
})

const userGet = async (username) => {
	return (await Users.findOne({username: username}, {_id: 0, __v: 0, password: 0}));

}

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