const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String
		},
		courseImage: {
			type: String
		},
		description: {
			type: String,
			required: true
		},
		cirriculums: [ { cirrtitle: String, cirrdescription: String } ]
	},
	{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
