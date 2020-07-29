const express = require('express');
const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv').config();
const auth = require('./routes/loginSignup/auth');
const users = require('./routes/loginSignup/users');
const contact = require('./routes/contact/contact');
const blog = require('./routes/blog/blog');
const course = require('./routes/course/course');
const image1 = require('./routes/image/image1');
const config = require('./config/key');

// dotenv.config();

const app = express();

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('Db connected'))
	.catch(() => console.log('Db connection failed'));

// app.use(fileUpload());

app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/queries', contact);
app.use('/api/blog', blog);
app.use('/uploads', express.static('uploads'));
app.use('/api/course', course);
app.use('/api/image', image1);

/*app.post('/api/auth', (req, res) => {
	res.status(400).json({ errors: { global: 'Invalid Credentials' } });
});*/

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
