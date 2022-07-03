const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionObj = {
    question:String,
    image:String
}

const TestSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    question:{
        type:questionObj,
        required:true
    },
    no:{
        type:Number,
        required:true,
        unique:true
    },
    answer:{
        type:String,
        required:true
    },
    options:[{
        type:String,
    }]
});

const Test = mongoose.model('Test',TestSchema);

module.exports = Test;