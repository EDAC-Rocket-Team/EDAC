const express = require("express");
const app = express();
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");
const bcrypt = require("bcrypt");
const { auth, authDonor, authBeneficiary } = require("../Auth");

app.get("/getBens", auth, (req, res) => {
  BenModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let benInfo = [];
      result.forEach((ben) => {
        let getBens = {
          centerName: ben.centerName,
          medicalZone: ben.medicalZone,
          phoneNumber: ben.phoneNumber,
          address: ben.address,
          email: ben.email,
          id: ben._id
        };
        benInfo.push(getBens);
      });
      res.json(benInfo);
    }
  });
});

app.post("/createBen", async (req, res) => {
  try {
    let {
      centerName,
      medicalZone,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
      acknowledge,
    } = req.body;
    // validate
    if (
      !centerName ||
      !medicalZone ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address
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
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    if (!acknowledge)
      return res
        .status(400)
        .json({ msg: "Please check that all information is correct!" });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new BenModel({
      centerName,
      medicalZone,
      email: email.toLowerCase(),
      password: passwordHash,
      phoneNumber,
      address,
      acknowledge,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/deleteBen", auth, authBeneficiary, async (req, res) => {
  try {
    let { email } = req.body;
    const entry = await BenModel.findOne({ email: email });
    if (!entry)
      return res.status(400).json("no account with this email is found");
    await BenModel.deleteOne({ email: email });
    res.status(200).json(email);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update user profile information
app.put("/update", auth, authBeneficiary, async (req, res) => {
  let {
    centerName,
    medicalZone,
    email,
    password,
    passwordCheck,
    phoneNumber,
    address,
  } = req.body;
  let user = null;
  if (!centerName && !medicalZone && !password && !passwordCheck && !phoneNumber && !address) {
    return res.status(400).json({ msg: "No fields have been updated" });
  }
  try {
    user = await BenModel.findOne({ email });
  } catch {
    res.status(500).send("Error in getting user");
  }
  if (user === null) {
    res.status(400).send("User not found");
  }
  if (centerName) {
    user.centerName = centerName;
  }
  if (medicalZone) {
    user.medicalZone = medicalZone;
  }
  if (address) {
    user.address = address;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (password) {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    }
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    try {
      const salt = await bcrypt.genSalt();
      newPassword = await bcrypt.hash(password, salt);
      user.password = newPassword;
    } catch {
      res.status(500).send("Error in hashing password");
    }
  }
  try {
    user.save();
    res.status(200).json({
      centerName: user.centerName,
      medicalZone: user.medicalZone,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      id: user._id
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
