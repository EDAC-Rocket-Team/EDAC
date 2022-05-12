const express = require('express')
const app = express();
const mongoose= require('mongoose')
const dotenv = require('dotenv').config()
const DonorModel = require('./models/donors')
const cors = require('cors');

const port = 3001

app.listen(port, () => {
    console.log(`Server started yay on ${port}`)
})



// allows us to connect to api using react

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://DianaGH:71193734mom@blood-donation.kt7ft.mongodb.net/edac?authSource=admin&replicaSet=atlas-12wwdo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
        .then(console.log("MongoDB Connected"))

     
app.get("/getDonors", (req,res) => {
    DonorModel.find({}, (err,result) =>{
        if(err){
            return res.status(500).json(err)
        } else {
            res.status(200).json(result);
        }
    })

app.post("/createDonor", async (req, res) => {
  const donor = req.body; /// will be sending this from the frntend
  const newD = new DonorModel(donor);
  await newD.save();

  res.json(donor);
});


})