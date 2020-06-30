const Joi = require('@hapi/joi');
function validateUser(user) {
	const schema = {
		firstname: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};
	return Joi.validate(user, schema);
}
module.exports = validateUser;
