const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const DonorModel = require("./models/donors");
const BenModel = require("./models/ben");
const cors = require("cors");

const donorRoute = require("./routes/donorRoute");
const benRoute = require("./routes/benRoute");
const common = require("./routes/signin");

// allows us to connect to api using react

app.use(express.json());
app.use(cors());
app.use("/donor", donorRoute);
app.use("/ben", benRoute);
app.use("/common", common);

//mongoose
  // .connect(
  //   "mongodb+srv://DianaGH:71193734mom@blood-donation.kt7ft.mongodb.net/edac?authSource=admin&replicaSet=atlas-12wwdo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  // )
  // .then(console.log("MongoDB Connected"));
mongoose
.connect(process.env.URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server started yay on ${port}`);
});