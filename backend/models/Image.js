const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
	{
		courseImg: String,
		course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
	},
	{ timestamps: true }
);

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
