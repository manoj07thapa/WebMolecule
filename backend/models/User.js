const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/key');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema(
	{
		firstname: {
			type: String
		},
		lastname: {
			type: String
		},
		email: {
			type: String,
			required: [ true, 'Email field is required' ],
			lowercase: true,
			index: true,
			unique: [ true, 'Already taken,sorry!!' ]
		},
		passwordHash: {
			type: String,
			required: true,
			min: 5
		}
	},
	{ timestamps: true }
);

//changes password provided by user during registration into hash
schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);
};
schema.methods.comparePasswords = function comparePasswords(password, confirmPassword) {
	return bcrypt.compareSync(password, confirmPassword);
};

//Adds an instance method to documents constructed from Models compiled from this schema
//compares user provided password and passwordHash in the database
schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

// schema.methods.isValidEmail = function isValidEmail(email) {
// 	return bcrypt.compareSync(email, this.email);
// };

schema.methods.generateJWT = function generateJWT() {
	return jwt.sign(
		{
			email: this.email
		},
		config.SECRET_KEY
	);
};

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		firstname: this.firstname,
		lastname: this.lastname,
		email: this.email,
		token: this.generateJWT()
	};
};

//verifies the uniqueness of the email provided durig signup and custom error message if not unique
schema.plugin(uniqueValidator, { message: 'This email is already taken' });

const User = mongoose.model('User', schema);
module.exports = User;
