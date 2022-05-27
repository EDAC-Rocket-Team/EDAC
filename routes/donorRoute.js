const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
const DonorModel = require("../models/donors");

app.get("/getSpecificDonor", async (req, res) => {
  const { email } = req.body;
  const donor = await DonorModel.findOne({ email: email });
  let details = {
    firstname: donor.firstname,
    lastname: donor.lastname,
    email: donor.email,
    phone: donor.phone,
    bloodtype: donor.bloodtype,
    alcoholpass: donor.alcoholpass,
    drugpass: donor.drugpass,
  };
  res.json(details);
});

// if (err) {
//   return res.status(500).json(err);
// } else {
//   // let profile = [];
//   result.forEach((userprofile) => {

//res.status(200).json(details);

app.post("/createDonor", async (req, res) => {
  const donor = req.body; /// will be sending this from the frntend
  const newD = new DonorModel(donor);
  await newD.save();

  res.json(donor);
});

module.exports = app;
