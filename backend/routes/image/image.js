let express = require('express'),
	multer = require('multer'),
	router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, uuidv4() + '-' + fileName);
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

router.post('/', upload.single('courseImage'), (req, res, next) => {
	console.log(req.file);
	const file = req.file;
	const image = new Image({
		courseImage: file
	});
	user
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'User registered successfully!',
				userCreated: {
					profileImg: result.profileImg
				}
			});
		})
		.catch((err) => {
			console.log(err),
				res.status(500).json({
					error: err
				});
		});
});

module.exports = router;
