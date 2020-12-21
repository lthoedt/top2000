const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users_schema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	reminders: [{
		aid: {
			type: String
		},
		reminded: {
			type: Boolean,
			default: false
		}
	}]
})

const Users = mongoose.model('Users', users_schema);

module.exports = Users;