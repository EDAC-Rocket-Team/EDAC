const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require('dotenv').config()
const BenModel = require("../models/ben");
const cors = require("cors");

app.get("/getBens", (req, res) => {
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
        };
        benInfo.push(getBens);
      });
      res.json(benInfo);
    }
  });
});


app.post("/createBen", async (req, res) => {
  const ben = req.body; /// will be sending this from the frntend
  const newB = new BenModel(ben);
  await newB.save();

  res.json(ben);
});

module.exports = app;
