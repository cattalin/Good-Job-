module.exports = function(app) {

    const VideosRouter = require( './VideosRouter' );
    const UsersRouter  = require( './UsersRouter' );
    const oldRouter    = require( './routes' );


    // let swaggerUi       = require( 'swagger-ui-express' );
    // let swaggerDocument = require( './swagger.json' );
    //
    // app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerDocument ) );


    // app.use( '/api/2.0/videos', VideosRouter );
    app.use( '/api/2.0/videos', VideosRouter );
    app.use( '/api/2.0/users', UsersRouter );
    app.use( '/api/2.0/routes', oldRouter );

    app.use( (err, req, res, next) => {
        if(err) {
            console.log( 'Invalid Request data' );
            res.status( 400 ).json( {status: 'bad_request'} );
        }
        else {
            next()
        }
    } );

};