var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true })
mongoose.set('useFindAndModify', true)

var commentSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1,0,1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        //-1 封号
        //0 正常
        //1 禁言
        enum: [-1, 0, 1],
        default:0
    }
})

module.exports = mongoose.model('Comment', commentSchema)
