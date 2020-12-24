const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songs_schema = new Schema({
	a: String,
	aa: String,
	aid: String,
	aud: String,
	did: String,
	img: String,
	pos: Number,
	prv: Number,
	s: String,
	sorta: String,
	sorts: String,
	ss: String,
	url: String,
	yr: Number
})

const Songs = mongoose.model('Songs', songs_schema);

module.exports = Songs;