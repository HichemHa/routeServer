const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    lastname:String,
    phone:Number,
    userName:String,
    password:String,
    email:String
});

module.exports = User = mongoose.model("user", userSchema);