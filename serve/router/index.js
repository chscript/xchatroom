const userRouter = require('./userRouter');

module.exports = app => {
    app.use('/user', userRouter);
}