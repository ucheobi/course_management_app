const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
      type: String,
      value: Boolean,
      required: true
  },
  dateOfBirth: { 
    type: Date
  },
  phoneNumber: Number,
  hashedPassword: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  }
  faculty: {
    type: String,
    required: true
  }
  department: String
  matNumber: {
    type: Number,
    required: true
  }
  degree: {
    type: String,
    required: true
  }
  accountType: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Account", accountSchema);
