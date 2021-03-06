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
  email: {
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
  },
  acknowledge: {
    type: Boolean,
    required: true,
  },
});

const BenModel = mongoose.model("ben", BenSchema);
module.exports = BenModel;