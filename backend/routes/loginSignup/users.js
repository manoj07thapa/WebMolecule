const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const parseErrors = require('../../utils/parseErrors');
const Yup = require('yup');
const { validateUser } = require('../../helpers/routeHelpers');

/** we only store email & password is first converted into hash vis setPassword() in User mideland stored
 * 
 */
const validationSchema = Yup.object({
	firstname: Yup.string().required('You must specify first name'),
	lastname: Yup.string(),
	email: Yup.string().required('You must specify email').email('Invalid email format'),
	password: Yup.string()
		.required('You must specify password')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
		),
	confirmPassword: Yup.string().oneOf([ Yup.ref('password') ], "Password doesn't match")
});

router.post('/', (req, res) => {
	validationSchema
		.validate(req.body.user, { abortEarly: false })
		.then((valid) => {
			const { firstname, lastname, email, password } = req.body.user;
			User.findOne({ email: email }).then((user) => {
				if (user) {
					res.status(403).json({ error: { global: 'Email already exist !!' } });
				} else {
					const user = new User({ firstname, lastname, email });
					user.setPassword(password);

					user.save().then((userRecored) => res.json({ user: userRecored.toAuthJSON() }));
				}
			});
		})
		.catch((err) => {
			const errors = [];
			err.inner.forEach((e) => {
				errors.push({
					name: e.path,
					serverErr: e.message
				});
			});
			res.status(400).json(errors);
		});

	// const { firstname, lastname, email, password, confirmPassword } = req.body.user;
	// const user = new User({ firstname: firstname, lastname: lastname, email: email });
	// user.setPassword(password);
	// user
	// 	.save()
	// 	.then((userRecored) => res.json({ user: userRecored.toAuthJSON() }))
	// 	.catch((err) => res.status(400).json({ errors: parseErrors(err.errors) }));
});
module.exports = router;
