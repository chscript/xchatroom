const express = require('express');
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/email');
const client = require('../utils/redis');
const router = express.Router();

//修改头像
router.post('/modify_avatar', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.account });
        if (user) {
            await User.updateOne({ email: req.body.email }, { avatar: req.body.avatar });
            res.json({
                code: 1,
                msg: "头像修改成功",
            })
        }
    } catch (err) {
        console.log(err);
    }
})

//修改密码
router.post('/modify_pwd', async (req, res) => {
    try {
        const value = await client.get(req.body.email);
        verify = (value == req.body.verifycode && value != null);
        if (verify) {
            await User.updateOne({ email: req.body.email }, { password: req.body.password });
            res.json({
                code: 1,
                msg: "密码修改成功",
            })
        } else {
            res.json({
                code: 0,
                msg: "验证码输入错误",
            })
        }
    } catch (err) {
        console.log(err);
    }
})

//邮箱验证
router.post('/verify_email', async (req, res) => {
    const verify = String(Math.floor(Math.random() * 9000) + 1000);
    let mailOptions = {
        from: "", //请输入QQ邮箱，带尖括号如：<123@qq.com>
        to: req.body.email,
        subject: "账号注册",
        html: verify
    }
    transporter.sendMail(mailOptions, async (err, info) => {
        if (!err) {
            res.json({
                code: 1,
                msg: "验证码发送成功",
            });
            await client.set(req.body.email, verify);
            await client.expire(req.body.email, 600);
        } else {
            res.json({
                code: 0,
                msg: "验证码发送失败",
            });
        }
    })
})


//用户注册
router.post('/register', async (req, res) => {
    try {
        // const email = await User.findOne({ email: req.body.email });
        // if (email) {
        //     res.json({
        //         code: 0,
        //         msg: "该邮箱已注册",
        //     })
        // } else {
        // const value = await client.get(req.body.email);
        // verify = (value == req.body.verifycode && value != null);
        // if (verify) {
        if (1) { //这里用来迅速添加用户测试，后面上线可以删除
            await User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }).save()
            res.json({
                code: 1,
                msg: "账号注册成功",
            })
        } else {
            res.json({
                code: 0,
                msg: "验证码输入错误",
            })
        }
        // }
    } catch (err) {
        console.log(err);
    }
})


//用户登录
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ email: req.body.account }, { username: req.body.account }] });
        if (!user) {
            res.json({
                code: 0,
                msg: "该用户或邮箱不存在",
            })
        } else {
            const { _id, username } = user;
            const token = jwt.sign({ _id, username }, 'rule', { expiresIn: '7days' });
            const isPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!isPassword) {
                res.json({
                    code: 0,
                    msg: "密码错误",
                })
            } else {
                res.json({
                    code: 1,
                    msg: "登录成功",
                    token: token,
                    data: {
                        avatar: user.avatar,
                        email: user.email,
                        username: user.username,
                    }
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
