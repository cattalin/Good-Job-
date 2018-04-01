
module.exports = function(app) {

    const VideosRouter = require('./VideosRouter');
    const oldRouter = require('./routes');

    app.use('/routes', VideosRouter);
    app.use('/routes', oldRouter);

};