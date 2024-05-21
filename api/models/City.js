// const mongoose = require("mongoose");
import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the city"],
  },
  district: {
    type: mongoose.Schema.ObjectId,
    ref: "District",
    required: true,
  },
});

const City = mongoose.model("City", CitySchema);

// module.exports = City;
export default City