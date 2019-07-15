//实现留言、修改个人信息和删除个人信息
let express = require('express')
let router = express.Router()
let Account = require('../modules/account')
let Comment = require('../modules/comment')


router.get('/', function (req, res, next) {
    Account.find(function (err, accounts) {
        if (err) {
            return next(err)
        } else {
            res.render('index.html', { accounts, user: req.session.user })
        }
    })
})
//渲染留言页面
router.get('/feedback', function (req, res) {

    Comment.find(function (err, comments) {
        if (err) {
            res.status(500).send('Server error')
        } else {
            res.render('feedback.html', { comments, user: req.session.user })
        }
    })
})
//渲染新增留言页面
router.get('/edit', function (req, res) {
    res.render('edit.html', {user: req.session.user})
})
//新增留言数据
router.post('/edit', function (req, res) {
    new Comment(req.body).save(function (err) {
        if (err) {
            res.status(500).send('数据保存失败')
        } else {
            res.redirect('/feedback')
        }
    })
})
//渲染修改信息页面
router.get('/setting', function(req, res) {
    Account.find({ studentId: req.query.id }, function(err, ret){
        if (err) {
            console.log('找不到该数据')
        } else {
            res.render('setting.html', { stu: ret[0],user: req.session.user})
        }
    })
})
//修改个人信息
router.post('/setting', function (req, res, next) {
    Account.find({ studentId: req.query.id }, function (err, ret) {
        if (err) {
            return next(err)
        } else {
            let id = ret[0]._id
            Account.findByIdAndUpdate(id, req.body, function (err) {
                if (err) {
                    return next(err)
                } else {
                    res.redirect('/')
                }
            })
        }
    })
})
//删除个人信息
router.get('/delete', function (req, res, next) {

   Account.deleteOne({ studentId: req.query.id }, function (err, ret) {
    if (err) {
        return next(err)
    } else {
        res.redirect('/logout')
       }
   })
})


module.exports = router
