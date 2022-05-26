const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require('dotenv').config()
const BenModel = require("../models/ben");
const cors = require("cors");

app.get("/getBens", (req, res) => {
  BenModel.find({}, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(result);
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
