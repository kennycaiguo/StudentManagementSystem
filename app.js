/**
 *app js入口模块
 *职责：创建服务、配置模块、body-parser解析post请求、
 提供静态资源服务、监听端口启动服务、挂载路由
 */
var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))
//配置art-template
app.engine('html', require('express-art-template'))

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//把路由器挂载到APP中
app.use(router)

//启动监听
app.listen(3000, function(){
    console.log('running 3000...')
})

module.experts = app
