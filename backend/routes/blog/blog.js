const express = require('express');
const multer = require('multer');
const Blog = require('../../models/Blog');
const router = express.Router();

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
			return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
		}
		cb(null, true);
	}
});
const upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
	});
});

router.post('/', (req, res) => {
	const { title, content, writer } = req.body.content;

	const blog = new Blog({ title, content, writer });
	blog
		.save()
		.then((contentRecord) => res.status(200).json({ success: true, contentRecord }))
		.catch((err) => res.json({ success: false, err }));
});

router.get('/', (req, res) => {
	Blog.find({}, (err, blog) => {
		if (err) res.status(404).json({ errors: { global: 'something went wrong' } });
		else res.status(200).json({ blog });
	});
});

// fetching a single blog from its id
router.post('/getBlog', (req, res) => {
	Blog.findOne({ _id: req.body.blogId }, (err, blog) => {
		if (err) res.status(400).json({ errors: { global: 'something went wrong' } });
		else res.status(200).json({ blog });
	});
});
module.exports = router;
