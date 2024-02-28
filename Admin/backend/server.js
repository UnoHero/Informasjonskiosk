require('dotenv').config({path: "../../.env"})

const express = require('express')
const mongoose = require('mongoose')
const Routes = require("./router/routes")
const userRoutes = require("./router/user")
const cors = require("cors")

// express app
const app = express()

// cors
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/admin", Routes)
app.use("/api/user", userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 