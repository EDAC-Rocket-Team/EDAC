const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    centerName: {
        type: String,
        required: true,
    },
    medicalZone: {
        type: String,
        required: true,
    },
    emailAdress: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    acknowledge: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const BenModel = mongoose.model("ben", UserSchema);
module.exports = BenModel;
