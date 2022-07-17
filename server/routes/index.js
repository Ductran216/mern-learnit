const authRouter = require('./auth');
const postRouter = require('./post');

function Route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter);
}

module.exports = Route;
