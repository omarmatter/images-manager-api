const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const auth = require('./controllers/auth');
const vrify = require('./middleware/verifyToken');
const folder = require('./controllers/folder');
const file = require('./controllers/files');

// mysql
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use('/auth',auth)
// routes must be after middleware
app.use('/folder', vrify, folder);
app.use('/file', vrify, file);

// allow to access uploads folder
app.use(express.static('uploads'));


app.listen(3000, () => console.log('Server started'));

