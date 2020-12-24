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
	sendStatus,
	getUsers,
	upcomingSongs,
	remindersPatch
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
		let users = await getUsers();

		const upcoming = await upcomingSongs();

		const toSend = [];

		users.forEach( user => {
			for ( const reminder of user.reminders ) {
				for ( const upc of upcoming ) {
					if (reminder.aid == upc.aid) {
						// already reminded so break;
						if (reminder.reminded===true)break;
						// new song gets created in toSend
						if (toSend[upc.aid]===undefined) toSend[upc.aid] = {song: null, users: []};
						toSend[upc.aid].song = upc;
						// push the current user into the toSend array
						toSend[upc.aid].users.push(user);
						break;
					}
				}
			}
		})

		if (toSend.length!==0) {
			toSend.forEach(async song => {
				for (const user of song.users) {
					await remindersPatch(user.username, upcoming);
				}
				sendEmail(song.users, song.song);
			})
		}
		
		res.status(200).json({
			success: true,
		})

	} catch (err) {
		sendStatus(res, 500, err);
	}
})

const sendEmail = async (to, song) => {
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

	let htmlEmail = await readFile(path.join('./mail.html'), 'utf8');

	const songTitle = song.s;
	const songArtist = song.a;
	const songCover = song.img;

	htmlEmail = htmlEmail.replace(/SONG_TITLE/gi, songTitle)
	htmlEmail = htmlEmail.replace(/SONG_ARTIST/gi, songArtist)
	htmlEmail = htmlEmail.replace(/SONG_COVER/gi, songCover)
	
	await transporter.sendMail({
		from: 'reminder@top2000.nl', // sender address
		to: to.map(user=>user.email), // list of receivers
		subject: `${songTitle} - ${songArtist} gaat zo beginnen!`, // Subject line
		text: `${songTitle} - ${songArtist} gaat zo beginnen!`, // plain text body
		html: htmlEmail, // html body
	});
}

module.exports = router;