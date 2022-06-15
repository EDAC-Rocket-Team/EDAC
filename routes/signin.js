const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");
const app = express();

app.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("edak-blood-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWTSECRET);
    if (!verified) return res.json(false);
    const donor = await DonorModel.findById(verified.id);
    const ben = await BenModel.findById(verified.id);
    if (!donor && !ben) return res.json(false);
    if (donor) return res.json(donor);
    if (ben) return res.json(ben);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const donor = await DonorModel.findOne({ email: email.toLowerCase() });
    const ben = await BenModel.findOne({ email: email.toLowerCase() });
    if (!donor && !ben) {
      return res.status(400).json({ msg: "User not found" });
    }

    // checking the email the different collections
    if (donor) {
      const matchDonorPassword = await bcrypt.compare(password, donor.password);
      if (!matchDonorPassword) {
        return res.status(400).json({ msg: "Invalid credential" });
      }
      const token = jwt.sign({ id: donor._id }, process.env.JWTSECRET, {
        expiresIn: '10h' // it will be expired after 10 hours
      });
      res
        .status(200)
        .json({
          token,
          firstname: donor.firstname,
          lastname: donor.lastname,
          birthdate: donor.birthdate,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
          bloodtype: donor.bloodtype,
          alcoholpass: donor.alcoholpass,
          drugpass: donor.drugpass,
        });
    } else if (ben) {
      const matchBenPassword = await bcrypt.compare(password, ben.password);
      if (!matchBenPassword) {
        return res.status(400).json({ msg: "Invalid credential" });
      }
      const token = jwt.sign({ id: ben._id }, process.env.JWTSECRET, {
        expiresIn: '10h' // it will be expired after 10 hours
      });
      res.status(200).json({
        token,
        centerName: ben.centerName,
        medicalZone: ben.medicalZone,
        email: ben.email,
        phoneNumber: ben.phoneNumber,
        address: ben.address,
        acknowledge: ben.acknowledge,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;