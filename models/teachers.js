const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    specialize : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required: true
    }
})

const Teacher = mongoose.model('Teacher',teacherSchema)
module.exports = Teacher