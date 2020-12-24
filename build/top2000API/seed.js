const {
	Songs
} = require('./database/db');

const axios = require('axios').default;

const URIs = require('./routes/URIs');

const {
	getSongs
} = require('./routes/restFunctions');

const seed = async () => {
	const songs = (await axios.get(URIs.songs())).data.data[0];

	await Songs.deleteMany({});	
	const status = await Songs.insertMany(songs);

	console.log(status);
}

seed();