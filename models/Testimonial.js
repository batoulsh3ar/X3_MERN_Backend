const { default: mongoose } = require('mongoose');

const Testimonial = mongoose.model('Testimonial', new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    user:{
     type : mongoose.Schema.Types.ObjectId,
     ref:"user"
    },
    ratinng:{
        type:Number,
        required: true,
        min: 1,
        max:5
    },
    description:{
        type: String,
        required: true,
    }
}, {
    timestamps: true  // This will automatically add timestamps (createdAt, updatedAt)
}));

module.exports =Testimonial ;


