const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
const DonorModel = require("../models/donors");
const BenModel = require("../models/ben");

// getSpecificUser:  User ...donor or brnrfeciary
// app.get("/signin", async (req, res) => {
//   const { email, password } = req.body;
//   const donor = await DonorModel.findOne({ email: email });
//   const ben = await BenModel.findOne({ email: email });

//   // checking the email the different collections
//   if (donor) {
//     bcrypt.compare(password, user, password);
//     if (matchPassword) {
//       return res.status(200).json({ msg: "You have signed in successfully" });
//     } else {
//       return res.status(400).json({ msg: "Invalid credential" });
//     }

//     if ({ password } == password) {
//       res.json(detailDonor);
//     }
//     let detailDonor = {
//       firstname: donor.firstname,
//       lastname: donor.lastname,
//       email: donor.email,
//       phone: donor.phone,
//       bloodtype: donor.bloodtype,
//       alcoholpass: donor.alcoholpass,
//       drugpass: donor.drugpass,
//     };
//   } else if (ben) {
//     let detailBen = {
//       centerName: ben.centerName,
//       medicalZone: ben.medicalZone,
//       email: ben.email,
//       phoneNumber: ben.phoneNumber,
//       address: ben.address,
//       acknowledge: ben.acknowledge,
//       password: ben.password,
//     };
//     res.json(detailBen);
//   } else {
//     res.json({ msg: "Incorrect Email" });
//   }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  app.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      // validate
      if (!email || !password) 
        return res
          .status(400)
          .json({ msg: "Not all fields have been entered." });

        const donor = await DonorModel.findOne({ email: email.toLowerCase() });
        const ben = await BenModel.findOne({ email: email.toLowerCase() });
        if (!donor && !ben) {
          return res.status(400).json({ msg: "User not found" });
        }

        // checking the email the different collections
        if (donor) {
          const matchDonorPassword = await bcrypt.compare(
            password,
            donor.password
          );
          //bcrypt.compare(password, donor,password)
          if (!matchDonorPassword) {
            return res.status(400).json({ msg: "Invalid credential" });
          }
        res.status(200).json({
          firstname: donor.firstname,
          lastname: donor.lastname,
          email: donor.email,
          phone: donor.phone,
          bloodtype: donor.bloodtype,
          alcoholpass: donor.alcoholpass,
          drugpass: donor.drugpass,
        });
      } else if (ben) {
        const matchBenPassword = await bcrypt.compare(password, ben.password);
        //bcrypt.compare(password, ben,password)
        if (!matchBenPassword) {
          return res.status(400).json({ msg: "Invalid credential" });
        }
        res.status(200).json({
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

  //finding user in db
  // const user = await UserSchema.findOne({email:email})
  // if (!user){
  //   return res.status(400).json({ msg: 'User not found'}
  //   )
  // }
  // comparing the password with the saved hash-password
  // const matchPassword =await
  // bcrypt.compare(password, user,password)
  //   if (matchPassword){
  //     return res
  //     .status(200)
  //     .json({msg: 'You have signed in successfully'})

  //   } else {
  //     return res.status(400).json({ msg: 'Invalid credential'})
  //   }
// });

module.exports = app;
