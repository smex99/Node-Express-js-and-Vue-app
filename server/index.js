const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config/config');

// Connect to mLab remote db service
mongoose.connect(config.db.mongodb.url, {useNewUrlParser: true});

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authentication'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/tags', require('./routes/tags'));

// Handle Production on Heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// Run the server on port 5000
app.listen(config.port);
console.log(`server started on port ${config.port}`);