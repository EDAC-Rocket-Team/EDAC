const mongoose = require("mongoose");

const BenSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
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
});

const BenModel = mongoose.model("ben", BenSchema);
module.exports = BenModel;