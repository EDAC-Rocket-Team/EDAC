const mongoose = require('mongoose')

const DonorSchema = new mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
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

const DonorModel = mongoose.model("donors", DonorSchema);
module.exports = DonorModel;
