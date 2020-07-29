const express = require('express');
const User = require('../../models/User');

const router = express.Router();

router.get('/', (req, res) => {
	User.find({}, (err, user) => {
		res.status(200).json({ user });
	});
});

router.post('/', (req, res, next) => {
	const { credentials } = req.body;
	User.findOne({ email: credentials.email }).then((user) => {
		if (user && user.isValidPassword(credentials.password)) {
			return res.json({
				userRecord: user.toAuthJSON()
			});
		}
		if (!user) {
			res.status(400).json({ errors: { emailErr: 'This is an invalid email address!' } });
		} else {
			res.status(400).json({ errors: { passErr: 'This is an invalid password!' } });
		}
	});
});

module.exports = router;
