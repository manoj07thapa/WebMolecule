const express = require('express');
const Course = require('../../models/Course');
const router = express.Router();
const Image = require('../../models/Image');
const User = require('../../models/User');

router.post('/', (req, res) => {
	const { title, subtitle, description, cirriculums } = req.body.content;
	const course = new Course({
		title,
		subtitle,
		description,
		cirriculums
	});

	course
		.save()
		.then((courseRecord) => res.status(200).json({ success: true, courseRecord }))
		.catch((err) => res.json({ success: false, errors: { global: 'Opps Something went wrong!!' } }));
});

router.get('/', async (req, res) => {
	const course = await Course.find({}).populate('courseImg', 'courseImg').exec();
	res.status(200).json({ course });
});

router.post('/getCourse', (req, res) => {
	Course.findOne({ _id: req.body.courseId }, (err, course) => {
		if (err) res.status(400).json({ errors: { global: 'something went wrong' } });
		else res.status(200).json(course);
	});
});
module.exports = router;
