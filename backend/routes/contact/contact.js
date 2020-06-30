const express = require('express');
const Contact = require('../../models/Contact');

const router = express.Router();

router.get('/', (req, res) => {
	Contact.find({}, (err, query) => {
		res.status(200).json({ query });
	});
});

router.post('/', (req, res) => {
	const { fullname, email, phoneNumbers, customer, student, query } = req.body.query;

	const contact = new Contact({ fullname, email, phoneNumbers, customer, student, query });
	contact
		.save()
		.then((contactRecord) => res.status(200).json({ contactRecord }))
		.catch((err) => res.status(400).json({ errors: { global: 'Something went wrong' } }));
});

module.exports = router;
