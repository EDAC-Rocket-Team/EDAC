const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const dotenv = require("dotenv").config();
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");
const bcrypt = require('bcrypt');


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
  try {
    let {
      firstname,
      lastname,
      email,
      password,
      passwordCheck,
      birthdate,
      address,
      phone,
      bloodtype,
      alcoholpass,
      drugpass,
    } = req.body;
    // validate
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !passwordCheck ||
      !birthdate ||
      !address||
      !phone ||
      !bloodtype ||
      !alcoholpass
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    const pattern =
      /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (!result) {
      return res.status(400).json({ msg: "Please enter an email." });
    }
    const existingBenUser = await BenModel.findOne({ email: email });
    const existingDonorUser = await DonorModel.findOne({ email: email });
    if (existingBenUser || existingDonorUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    if (password != passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new DonorModel({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: passwordHash,
      birthdate,
      address,
      phone,
      bloodtype,
      alcoholpass,
      drugpass,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteDonor",
  async (req, res) => {
    try {
      let { email } = req.body;
      const entry = await DonorModel.findOne({ email });
      if (!entry)
        return res.status(400).json("no account with this email is found");
      await DonorModel.deleteOne({email: email});
      res.status(200).json(email);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

module.exports = app;