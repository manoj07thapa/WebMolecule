const mongoose = require('mongoose');
const Image = require('./Image');
const User = require('./User');

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String
		},
		courseImg: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
		description: {
			type: String,
			required: true
		},
		cirriculums: [ { cirrtitle: String, cirrdescription: String } ]
	},
	{ timestamps: true }
);

const Course = mongoose.model('course', courseSchema);
module.exports = Course;
