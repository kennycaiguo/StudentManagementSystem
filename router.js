/**
 *router js路由模块
 *职责：处理路由，根据不同处理方法+请求路径设置具体的请求处理函数。
 */
var fs = require('fs')
var express = require('express')
var student = require('./student')

var router = express.Router()

router.get('/', function (req, res){
    student.findAll(function (err, students) {
        if (err) {
            return res.status(500).send('Servel error')
        } else {
            res.render('index.html',{
                students
            })
        }    
    })
})

router.get('/new', function (req, res) {
    student.findById(req.query.id, function (err, stu) {
        if (err) {
            return res.status(500).send('Servel error')
        } else {
            res.render('new.html',{
                stu
            })   
        }    
    })
})

router.post('/new', function (req, res) {
    student.updateById(req.body, function(err){
        if(err){
            console.log('修改失败')
        }else {
            res.redirect('/')
        }
    })
})

router.get('/edit', function (req, res) {
    student.findAll(function (err, students) {
        if (err) {
            return res.status(500).send('Servel error')
        } else {
            res.render('edit.html')
        }    
    })
})

router.post('/edit', function (req, res) {
    student.save(req.body, function (err) {
        if(err){
            console.log('数据有误')
        }else {
            res.redirect('/')
        }
    })
})

router.get('/delete', function (req, res) {
    student.delete(req.query.id, function (err) {
        if(err){
            res.status(500).send('删除失败')
        }else {
            student.findAll(function (err, students) {
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
