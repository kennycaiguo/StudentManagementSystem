/**
 *router js路由模块
 *职责：处理路由，根据不同处理方法+请求路径设置具体的请求处理函数。
 */
var express = require('express')
var Student = require('./student.js')
var router = express.Router()

router.get('/', function (req, res){
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Servel error')
        } else {
            res.render('index.html',{
                students
            })
        }    
    })
})

router.get('/new', function (request, response) {
    Student.findById(request.query.id, function (err, stu) {
        if (err) {
            return response.status(500).send('Servel error')
        } else {
            response.render('new.html',{
                stu
            })   
        }    
    })
})

router.post('/new', function (req, res) {
    if (req.body.gender === '1') {
        req.body.gender = '女'
    } else {
        req.body.gender = '男'
    }
    Student.find({ studentId: req.body.studentId }, function (err, ret) {
        if (err) {
        console.log('修改失败')
        } else {
            var id = ret[0]._id
            Student.findByIdAndUpdate(id, req.body, function(err){
                if(err){
                    console.log('修改失败')
                }else {
                    res.redirect('/')
                }
            })
        }
    })
})


router.get('/edit', function (req, res) {
    Student.find(function (err, ret) {
        if (err) {
            return res.status(500).send('Servel error')
        } else {
            res.render('edit.html')
        }    
    })
})

router.post('/edit', function (req, res) {
    if (req.body.gender === '1') {
        req.body.gender = '女'
    } else {
        req.body.gender = '男'
    }
    new Student(req.body).save(function (err, ret) {
        if(err){
            console.log('数据有误')
        }else {
            res.redirect('/')
        }
    })
})

router.get('/delete', function (req, res) {
    Student.remove({studentId: req.query.id}, function (err) {
        if(err){
            res.status(500).send('删除失败')
        }else {
            Student.find(function (err, students) {
                if(err){
                    res.status(500).send('读取失败')
                }else {
                    res.redirect('/')
                }
            })
        }
    })
})

module.exports = router
