import mongoose from 'mongoose';
// const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "Please provide the initial name of the state"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide the name of the state"],
    unique: true,
  },
});

const State = mongoose.model("State", StateSchema);

// module.exports = State;
export default State
