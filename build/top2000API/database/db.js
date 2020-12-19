require('./Users');

const mongoose = require('mongoose');

const url = require('./config').mongoURI;
// test url
// const url = require('./config').testMongoURI;

const db = mongoose.connection;
const Users = mongoose.model('Users');

const createDatabase = async () => {
	await mongoose.connect(url, {
		useNewUrlParser: true
	})
}

createDatabase();

module.exports = {
	url,
	Users,
}