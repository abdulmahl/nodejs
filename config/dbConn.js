const mongoose = require("mongoose");
const db_uri = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db_uri);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
