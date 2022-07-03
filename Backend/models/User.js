const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    university:{
        type:String,
        default:"Belirtilmemiş"
    },
    completedLesson:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson'
    }],
    completedTest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test'
    }],
    //sadece doğru cevapladığı sorular tutulsun
    wrongTest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test'
    }]
});

const User = mongoose.model('User',UserSchema);

module.exports = User;