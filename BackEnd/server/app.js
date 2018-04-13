//Needed prerequisites
const express    = require( 'express' );
const path       = require( 'path' );
const bodyParser = require( 'body-parser' );
const cors       = require( 'cors' );
const passport   = require( 'passport' );
const mongoose   = require( 'mongoose' );


//Connecting to DataBase
const config = require( './config/database' );
mongoose.connect( config.database );
mongoose.connection.on( 'connected', () => {

    console.log( 'Connected to database ' + config.database );

} );
mongoose.connection.on( 'error', (err) => {

    console.log( 'Database error: ' + err );

    //todo find a way to make this work
    app.use( '/', (req, res) => {
        console.log( 'Request failed because database server has a problem' );
        res.status( 500 ).json( {status: 'internal_server_error'} );
    } );

} );


//port number
const PORT = 8000 || process.env.PORT;


//Express environment
var app = express();


// CORS Middleware
app.use( cors() );

// Body Parser Middleware
app.use( bodyParser.json() );

// Set Static Folder
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Passport Middleware
app.use( passport.initialize() );
app.use( passport.session() );
require( './config/passport' )( passport );


//Routing
let Router = require( './routes/Router' );
Router     = new Router( app );


// Start Server
app.listen( PORT, () => {
    console.log( 'Server started on port ' + PORT );
} );

