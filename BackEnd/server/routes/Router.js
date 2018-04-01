
module.exports = function(app) {

    const VideosRouter = require ('./VideosRouter');
    const UsersRouter  = require ('./UsersRouter');
    const oldRouter    = require ('./routes');

    app.use('/routes', VideosRouter);
    app.use('/users', UsersRouter);
    app.use('/routes', oldRouter);

};