const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const donorRoute = require("./routes/donorRoute");
const benRoute = require("./routes/benRoute");
const common = require("./routes/signin");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/donor", donorRoute);
app.use("/ben", benRoute);
app.use("/common", common);

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => (
    console.log('MongoDB Connected')
  ));

mongoose.connection.on('error', err => {
  console.log(err.message)
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server started yay on ${port}`);
});