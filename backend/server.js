const express = require('express')
const dotenv = require('dotenv').config()
// const mongoose= require('mongoose')
// mongoose.connect(mongodb+srv://DianaGH:<password>@blood-donation.kt7ft.mongodb.net/test)
const port = 5000

const app = express()

app.listen(port, () => console.log(`Server started yay on ${port}`))
