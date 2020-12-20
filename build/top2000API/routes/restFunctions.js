const axios = require('axios').default;
const URIs = require('./URIs');

const {
	Users
} = require('../database/db');

const sendStatus = (res, status, message) => {
	const response = {
		success: false
	}
	switch (status) {
		case 404:
			response.message = (message) ? message : "Not found.";
			break;
		case 500:
			response.message = (message) ? message : "Server error occurred";
			break;
		case 412:
			response.message = (message) ? message : "Missing expected content";
			break;
		case 409:
			response.message = (message) ? message : "Already exists"
			break;
		case 400:
			response.message = (message) ? message : "Given resource is wrong"
		case 200:
			response.message = (message) ? message : "Succes!";
			response.success = true;
			break;
	}

	return res.status(status).json(response);
}

const getUsers = () => {
	return Users.find({}, {
		_id: 0,
		username: 1,
		email: 1,
		reminders: 1
	});
}

const getSongs = async () => {
	return (await axios.get(URIs.songs())).data.data[0];
}

const userGet = async (username) => {
	return (await Users.findOne({
		username: username
	}, {
		_id: 0,
		__v: 0,
		password: 0
	}));
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

const currentSong = async () => {
	return (await axios.get(URIs.playing)).data.data[0]
}

const upcomingSongs = async () => {
	const songs = await getSongs();
	const playing = await currentSong();

	let upcoming = [];

	let currentIndex;
	for (const [index,song] of songs.entries()) {
		if (playing.id===song.aid) {
			currentIndex = index;
			break;
		}
	}

	currentIndex = 9;
	
	if (currentIndex ===undefined) return upcoming;
	
	for ( let i = 0; i<3; i++ ) {
		const nextSong = songs[currentIndex-i]
		if (nextSong) upcoming.push(nextSong)
		else break;
	}

	return upcoming;
}

module.exports = {
	sendStatus,
	getUsers,
	getSongs,
	userGet,
	accountExists,
	emailIsValid,
	usernameIsValid,
	currentSong,
	upcomingSongs
}