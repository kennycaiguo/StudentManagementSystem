//实现登录、注册、退出登录等功能
var Account = require('../modules/account')
var express = require('express')
var md5 = require('blueimp-md5')
var session = express.Router()


//登录
session.get('/login', function (req, res) {
    res.render('login.html')
})

session.post('/login', function (req, res, next) {
    Account.find({ studentId: req.body.studentId }, function(err, user){
        if (err) {
            return next(err)
        } else {
            if (user.length == 0) {
                res.status(200).json({
                    err_code: 404,
                    message: '账号不存在'
                })
            } else {
                req.body.password = md5(md5(req.body.password))
                if (req.body.password === user[0].password){
                    req.session.user = user
                    //添加Session数据
                    return res.status(200).json({
                    err_code: 0,
                    message: '登录成功'
                    })
                } else {
                    res.status(200).json({
                        err_code: 1,
                        message: '密码错误'
                    })
                }
            }
        }
    })
})

//登录退出
session.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/login')
})

//注册
session.get('/regist', function (req, res) {
    res.render('regist.html')
})
session.post('/regist', function (req, res, next) {
    Account.find({ studentId: req.body.studentId }, function (err, ret){
        if (err) {
            return next(err)
        } else {
            //判断是否有相同的账号已被注册，返回长度不为0，则说明账号被注册
            if (ret.length !== 0) {
                return res.status(200).json({
                    err_code: 1,
                    message: '帐号已被注册'
                })
            } else {
                //对密码进行2次md5重复加密
                req.body.password = md5(md5(req.body.password))
                new Account(req.body).save(function (err, user) {
                    if (err) {
                        return next(err)
                    } else {
                        req.session.user = user
                        return res.status(200).json({
                            err_code: 0,
                            message: '注册成功'
                        })
                    }
                })
            }
        }
    })
})
//修改密码
session.get('/modify', function (req, res) {
    res.render('modifyPassword.html')
})
session.post('/modify', function (req, res, next) {
    Account.find({ studentId: req.body.studentId }, function (err, ret){
        if (err) {
            return next(err)
        } else {
            //验证原密码是否正确
            let oldPassword = md5(md5(req.body.password))
            let newPassword = md5(md5(req.body.newPassword))
            if (ret[0].password == oldPassword) {
                let id = ret[0]._id
                Account.findByIdAndUpdate(id, {password: newPassword}, function (err) {
                    if (err) {
                        return next(err)
                    } else {
                        return res.status(200).json({
                            err_code: 0,
                            message: '修改成功'
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    err_code: 1,
                    message: '原始密码输入错误'
                })
            }
        }
    })
})

module.exports = session
