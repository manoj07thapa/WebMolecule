let express = require('express'),
	multer = require('multer'),
	router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, fileName);
	}
});

var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	}
});

// User model
let Image = require('../../models/Image');
let Course = require('../../models/Course');

router.post('/', upload.single('courseImg'), async (req, res, next) => {
	console.log(req.file);
	// const url = req.protocol + '://' + req.get('host');
	const image = new Image({
		courseImg: '../../uploads/' + req.file.filename
	});
	const courseId = req.body.courseId;
	console.log(courseId);
	const course = await Course.findById(courseId);
	image.course = course;
	await image.save();
	console.log(image);
	course.courseImg = image;
	await course.save();
	//we are not showing anything in our image upload component hence we dont need to return any response to client
	// await Image.find({}).exec((err, data) => {
	// 	res.status(201).json({
	// 		message: 'User registered successfully!',

	// 		courseImg: data
	// 	});
	// });
});

//we are not showing anything in our image upload component hence we dont need to return any response to client

// router.get('/', async (req, res, next) => {
// 	await Image.find({}).pupulate('course').exec((err, data) => {
// 		res.status(200).json({
// 			message: 'User list retrieved successfully!',
// 			courseImg: data
// 		});
// 	});
// });

module.exports = router;
