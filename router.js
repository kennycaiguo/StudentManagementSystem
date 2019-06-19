var express = require('express')
var Student = require('./student.js')
var router = express.Router()
//查找渲染首页
router.get('/', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            res.status(500).send('Servel error')
        } else {
            res.render('index.html', { students })
        }
    })
})
//渲染新增学生页面
router.get('/edit', function (req, res) {
    res.render('edit.html')
})
//新增学生数据
router.post('/edit', function (req, res) {
    new Student(req.body).save(function (err) {
        if (err) {
            res.status(500).send('数据保存失败')
        } else {
            res.redirect('/')
        }
    })
})
//渲染修改学生数据页面
router.get('/new', function(req, res) {
    Student.findById(req.query.id, function (err, stu) {
        if (err) {
            console.log('找不到该数据')
        } else {
            res.render('new.html', { stu })
        }
    })
})
//Post修改的数据
router.post('/new', function (req, res) {
    Student.find({ studentId: req.body.studentId }, function (err, ret) {
        if (err) {
            console.log('找不到该数据')
        } else {
        var id = ret[0]._id
        Student.findByIdAndUpdate(id, req.body, function (err) {
            if (err) {
                console.log('修改失败')
            } else {
                res.redirect('/')
            }
        })
        }
    })
})
//删除数据
router.get('delete', function (req, res) {
    Student.delete(req.query.id, function(err){
        if (err) {
            console.log('删除失败')
        } else {
            res.redirect('/')
        }
    })
})
module.exports = router
