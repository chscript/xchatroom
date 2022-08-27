const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
        user: "", //邮箱号码
        pass: "" //邮箱凭证
    }
})

module.exports = transporter;
