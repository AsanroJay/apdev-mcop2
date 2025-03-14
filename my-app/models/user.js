const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    dlsuEmail: String,
    studentId: String,
    password: String,
  },
  { versionKey: false } 
);

const User = mongoose.model("User", userSchema);

module.exports = User;
