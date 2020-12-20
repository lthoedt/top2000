const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const nodemailer = require('nodemailer');

const secrets = require('../secrets');

const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const path = require('path');

const {
	Users
} = require('../database/db');

const {
	sendStatus
} = require('./restFunctions');

const URIs = require('./URIs');

router.get('/', async (req, res) => {
	try {
		let emails = await getUsers();

		res.status(200).json({
			success: true,
			data: emails
		})


	} catch (err) {
		sendStatus(res, 500, err);
	}
})

router.get('/send', async (req, res) => {
	try {
		let emails = await getUsers();

		let transporter = nodemailer.createTransport({
			name: 'reminder@top2000.nl',
			host: "mail.dutchta.com",
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: secrets.mail.username,
				pass: secrets.mail.password,
			},
		});

		let info = await transporter.sendMail({
			from: 'reminder@top2000.nl', // sender address
			to: "lthoedt@gmail.com", // list of receivers
			subject: "Reminder", // Subject line
			text: "Hello world?", // plain text body
			html: await readFile(path.join('./mail.php'), 'utf8'), // html body
		});

		console.log(info)

		res.status(200).json({
			success: true,
			data: emails
		})


	} catch (err) {
		console.log(err)
		sendStatus(res, 500, err);
	}
})

const getUsers = () => {
	return Users.find({}, {
		_id: 0,
		username: 1,
		email: 1
	});
}

module.exports = router;