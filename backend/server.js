// ovako smo radili prije babel
/*const cors = require("cors")
const express = require("express")
const data = require("./data.js") */
import express from "express"

import cors from "cors"
import mongoose from "mongoose"
import config from "./config.js"
import userRouter from "./routers/userRouter.js"
import bodyParser from "body-parser"
import orderRouter from "./routers/orderRouter.js"
import productRouter from "./routers/productRouter.js"
import uploadRouter from "./routers/uploadRouter.js"
import path from 'path'



mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to mongodb")
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  })



const app = express()
// cors security
app.use(cors())
// bcs data we send is in the json format
app.use(bodyParser.json())
// place we take data of users
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/products", productRouter)
app.use("/api/uploads", uploadRouter)

// to serve all filies inside of frontend in backend
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
})



// this code handle all errors in our express
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500
  res.status(status).send({ message: err.message })
})


// port where on which data run
app.listen(3000, () => {
    console.log("radi na http://localhost:3000")
})