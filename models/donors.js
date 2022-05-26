const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    }, 
    lastname: {
        type: String,
        required: true, 
    }, 
    email: {
        type: String, 
        required: true, 
        unique:true,
    },
    phone: {
        type: Number,
        required: true,
    },
    bloodtype: {
        type: String,
        required: true,
    },
    alcoholpass: {
        type: String,
        required: true,
    },
    drugpass: {
        type: Boolean,
        required: true,
    },
});

const DonorModel = mongoose.model("donors",UserSchema);
module.exports = DonorModel;
