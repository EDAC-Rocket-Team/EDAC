const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require('dotenv').config()
const DonorModel = require("../models/donors");

app.get("/getDonors", (req, res) => {
  DonorModel.find({}, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/createDonor", async (req, res) => {
  const donor = req.body; /// will be sending this from the frntend
  const newD = new DonorModel(donor);
  await newD.save();

  res.json(donor);
});

module.exports = app;
