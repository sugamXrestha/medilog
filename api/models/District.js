// const mongoose = require("mongoose");
import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the district"],
    unique: true,
  },
  state: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
    required: true,
  },
});

const District = mongoose.model("District", DistrictSchema);

// module.exports = District;
export default District
