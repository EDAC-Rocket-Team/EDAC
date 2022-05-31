const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");

// getSpecificUser:  User ...donor or brnrfeciary 
app.get("/signin", async (req, res) => { 
  const { email } = req.body;
  const donor = await DonorModel.findOne({ email: email });
  const ben = await BenModel.findOne({email: email})

  // checking the email the different collections 
  if(donor){
    let detailDonor = {
      firstname: donor.firstname,
      lastname: donor.lastname,
      email: donor.email,
      phone: donor.phone,
      bloodtype: donor.bloodtype,
      alcoholpass: donor.alcoholpass,
      drugpass: donor.drugpass,
    };
    res.json(detailDonor);
  } else if(ben) {
    let detailBen = {
      centerName: ben.centerName,
      medicalZone: ben.medicalZone,
      email: ben.email,
      phoneNumber: ben.phoneNumber,
      address: ben.address,
      acknowledge: ben.acknowledge,
      password: ben.password,
    };
    res.json(detailBen);
  } else {
    res.json({msg: "Incorrect Email"})
  }

});

module.exports = app;