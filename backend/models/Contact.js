const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
			index: true
		},
		email: {
			type: String,
			required: true
		},
		phoneNumbers: {
			type: Array
		},
		customer: {
			type: Boolean,
			default: false
		},
		student: {
			type: Boolean,
			default: false
		},

		query: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

const Contact = mongoose.model('Contact', schema);
module.exports = Contact;
