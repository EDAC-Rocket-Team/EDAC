const express = require("express");
const app = express();
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");
const bcrypt = require("bcrypt");
const { auth, authDonor, authBeneficiary } = require("../Auth");

app.get("/getDonors", auth, (req, res) => {
  DonorModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      let donorInfo = [];
      result.forEach((donor) => {
        let getDonors = {
          firstname: donor.firstname,
          lastname: donor.lastname,
          birthdate: donor.birthdate,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
          bloodtype: donor.bloodtype,
          alcoholpass: donor.alcoholpass,
          drugpass: donor.drugpass,
          id: donor._id,
        };
        donorInfo.push(getDonors);
      });
      res.json(donorInfo);
    }
  });
});

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
      !address ||
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

app.put("/deleteDonor", auth, authDonor, async (req, res) => {
  try {
    let { email } = req.body;
    const entry = await DonorModel.findOne({ email });
    if (!entry)
      return res.status(400).json("no account with this email is found");
    await DonorModel.deleteOne({ email });
    res.status(200).json(email);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update user profile information
app.put("/update", auth, authDonor, async (req, res) => {
  let {
    firstname,
    lastname,
    email,
    password,
    passwordCheck,
    phone,
    address,
    alcoholpass,
    drugpass,
  } = req.body;
  let user = null;
  if (!firstname && !lastname && !password && !passwordCheck && !phone && !address) {
    return res.status(400).json({ msg: "No fields have been updated" });
  }
  try {
    user = await DonorModel.findOne({ email });
  } catch {
    res.status(500).send("Error in getting user");
  }
  if (user === null) {
    res.status(400).send("User not found");
  }
  if (firstname) {
    user.firstname = firstname;
  }
  if (email) {
    user.email = email;
  }
  if (lastname) {
    user.lastname = lastname;
  }
  if (address) {
    user.address = address;
  }
  if (phone) {
    user.phone = phone;
  }
  if (alcoholpass) {
    user.alcoholpass = alcoholpass;
  }
  if (drugpass) {
    user.drugpass = drugpass;
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
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthdate: user.birthdate,
      address: user.birthdate,
      phone: user.birthdate,
      bloodtype: user.birthdate,
      alcoholpass: user.alcoholpass,
      drugpass: user.drugpass,
      id: user._id,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
