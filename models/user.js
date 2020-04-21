const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema)