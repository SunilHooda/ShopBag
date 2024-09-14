const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MongoDB_url);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
