/**
 * student js
 * 数据操作文件模块
 * 职责：只处理数据，不关系业务 
 */
var fs = require('fs')

var dbPath = './db.json'
/**
 * 获取学生列表
 */
exports.findAll = function (callback) {
  fs.readFile(dbPath,'utf8',function (err, data) {
    if (err) {
      return callback(err)
    }else {
    callback(null, JSON.parse(data).students)
    }
  })
}
exports.findById = function (id, callback) {
  fs.readFile(dbPath,'utf8',function (err, data) {
    if (err) {
      return callback(err)
    }else {
      students = JSON.parse(data).students
      var stu = students.find(function (item) {
          return item.id == id
      })
      callback(null, stu)
    }
  })
} 

 /**
 * 添加保存学生
 */
exports.save = function (newstudent, callback) {
  //先读取数据(由于读取到的数据是二进制数据，需要第二个参数来识别类型)
  fs.readFile(dbPath,'utf8',function (err, data) {
    if (err) {
      return callback(err)
    }else {
      //将JSON数据转化为对象
      var students = JSON.parse(data).students   
      //把用户传递数据保存到students对象中
      if (newstudent.gender === '0') {
        newstudent.gender = '男'
      }else{
        newstudent.gender = '女'
      }
      students.push(newstudent)
      //将对象处理成JSON格式的字符串
      var fileData = JSON.stringify({students})
      //将JSON格式的字符串写入db.JSON中
      fs.writeFile(dbPath, fileData, function (err) {
        if(err){
          return callback(err)
        }else {
        callback(null)
        }
      })
    }
  })
}  
 /**
 * 修改更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath,'utf8',function (err, data) {
    if (err) {
      return callback(err)
    }else {
      student.id = parseInt(student.id)
      var students = JSON.parse(data).students
      //ES6数组方法,遍历数组，当数组某一项的某个属性的值相同时，停止遍历数组返回遍历的对象
      //由此stu就是我们要修改的对象
      //var stu = students.find((item) => {
      //  return item.id === editedStudent.id
      //})
      var stu = students.find(function (item) {
        return item.id == student.id
      })
      if (student.gender === '0') {
        student.gender = '男'
      }else{
        student.gender = '女'
      }
      //遍历获得新的属性值
      for (var key in student) {
        stu[key] = student[key]
      }
      //把对象数据转化为字符串
      var fileData = JSON.stringify({students})
      //更新数据
      fs.writeFile(dbPath, fileData, function(err){
        if(err){
          return callback(err)
        }else {
          callback(null)
        }
      })
    }
  })
}

//exports.updateById = function (student, callback) {
//  fs.readFile(dbPath, 'utf8', function (err, data) {
//    if (err) {
//      return callback(err)
//    }
//    var students = JSON.parse(data).students
//
//    // 注意：这里记得把 id 统一转换为数字类型
//
//    // 你要修改谁，就需要把谁找出来
//    // EcmaScript 6 中的一个数组方法：find
//    // 需要接收一个函数作为参数
//    // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
//    var stu = students.find(function (item) {
//      return item.id == student.id
//    })
//    // 这种方式你就写死了，有 100 个难道就写 100 次吗？
//    //stu.name = student.name
//    //stu.age = student.age
//
//    // 遍历拷贝对象
//    for (var key in student) {
//      stu[key] = student[key]
//    }
//
//    // 把对象数据转换为字符串
//    var fileData = JSON.stringify({
//      students: students
//    })
//
//    // 把字符串保存到文件中
//    fs.writeFile(dbPath, fileData, function (err) {
//      if (err) {
//        // 错误就是把错误对象传递给它
//        return callback(err)
//      }
//      // 成功就没错，所以错误对象是 null
//      callback(null)
//    })
//  })
//}


 /**
 * 删除学生
 */
exports.delete = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if(err){
        return callback(err)
      }else {
        var students = JSON.parse(data).students
        var deleteId = students.findIndex(function (item) {
          return item.id == id
        })
        students.splice(deleteId,1)
        var fileData = JSON.stringify({students})
        fs.writeFile(dbPath, fileData, function(err){
          if(err){
            callback(err)
          }else {
            callback(null)
          }
        })
      }
    })
}