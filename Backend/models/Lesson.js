const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bodyObject = {
    title:String,
    image:String,
    imgDescription:String,
    body:String
}

const LessonSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    no:{
        type:Number,
        required:true,
        unique:true
    },
    body:[{
        type:bodyObject,
    }],
    testID:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test'
    }]
});

const Lesson = mongoose.model('Lesson',LessonSchema);

module.exports = Lesson;