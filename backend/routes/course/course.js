const express = require('express');
const Course = require('../../models/Course');
const router = express.Router();

router.post('/', (req, res) => {
	console.log(req.body);

	const { title, subtitle, description, cirriculums } = req.body.content;

	const course = new Course({ title, subtitle, description, cirriculums });
	course
		.save()
		.then((courseRecord) => res.status(200).json({ success: true, courseRecord }))
		.catch((err) => res.json({ success: false, errors: { global: 'Opps Something went wrong!!' } }));
});

router.get('/', (req, res) => {
	Course.find({}, (err, course) => {
		if (err) res.status(404).json({ errors: { global: 'something went wrong' } });
		else res.status(200).json({ course });
	});
});

// // fetching a single blog from its id
// router.post('/getBlog', (req, res) => {
// 	Blog.findOne({ _id: req.body.blogId }, (err, blog) => {
// 		if (err) res.status(400).json({ errors: { global: 'something went wrong' } });
// 		else res.status(200).json({ blog });
// 	});
// });
module.exports = router;
