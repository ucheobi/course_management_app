const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const profileSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  middle_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true
  },
  gender: {
      type: String,
      required: true
  },
  date_of_birth: { 
    type: Date
  },
  email: { 
    type: String,
    required: true
  },
  phone_number: Number,
  nationality: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: false
  },
  department: String,
  mat_number: {
    type: String,
    required: true,
    unique: true
  },
  degree: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  }

});

profileSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Profile", profileSchema);
