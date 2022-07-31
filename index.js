const express = require("express");
const connectDB = require('./database/connectDB')
const user = require('./database/routes/user')
const casetest = require('./database/routes/casetest')
const cors = require('cors')
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
console.log(process.env.PORT)
const PORT = process.env.PORT || 8000;

app.use('/user',user)
app.use('/casetest',casetest)

app.use('/uploads', express.static('uploads'));
connectDB();
/** start the server */
app.listen(PORT, (err) =>
  err
    ? console.log("Server Error", err)
    : console.log(`Server is running on PORT ${PORT}`)
);
