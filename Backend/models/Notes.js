const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    body:{
        type:String
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    updatedDate:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
});

const Notes = mongoose.model('Notes',NotesSchema);

module.exports = Notes;