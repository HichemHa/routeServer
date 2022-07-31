const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://admin:admin@cluster0.odmfu.mongodb.net/route?retryWrites=true&w=majority', );

    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Data base error", error);
  }
};

module.exports = connectDB;