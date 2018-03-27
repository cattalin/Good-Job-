
module.exports = function(app) {

    const VideosRouter = require('./VideosRouter');

    app.use('/routes', VideosRouter);

};