const mongoose = require('mongoose');

module.exports = app => {
    mongoose.connect('mongodb://localhost/test').then(
        () => { console.log("数据库连接成功！"); },
        err => { console.log("数据库连接失败！"); })
}