require("dotenv").config()
const express = require('express')
const app = express();
const server = require('http').Server(app)
const bodyParser = require("body-parser")
const cors = require('cors')
const morgan = require("morgan")
const { routes } = require("./config/Route")
const db = require("./config/DB")
const { PORT } = require("./config/Constants")

app.use(cors())
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }))
app.use(bodyParser.json({ limit: "2mb" }))
app.use(morgan("combined"))
app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Al"
    + "low-Methods",
  )
  res.header("X-Frame-Options", "deny")
  res.header("X-Content-Type-Options", "nosniff")
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  else {
    next()
  }
})
app.use(express.static('uploads'));
app.use("/", routes)

server.listen(process.env.PORT , ()=>{
    console.log("Server running on port : " + process.env.PORT);
})