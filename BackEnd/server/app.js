//Needed prerequisites
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');

//port number
const PORT = 8000 || process.env.PORT;
//Express environment
var app = express();

//Connecting to DataBase
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});



// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//Routing
const routes = require('./routes/routes');
app.use('/routes', routes);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



// Start Server
app.listen(PORT, () => {
    console.log('Server started on port '+PORT);
});

