
module.exports = function(app) {

    const VideosRouter = require ('./VideosRouter');
    const UsersRouter  = require ('./UsersRouter');
    const oldRouter    = require ('./routes');

    app.use('/videos', VideosRouter);
    app.use('/users',  UsersRouter);
    app.use('/routes', oldRouter);

    app.use((err, req, res, next) => {
        if (err) {
            console.log('Invalid Request data');
            res.status(400).json({status:'bad_request'});
        } else {
            next()
        }
    });

};