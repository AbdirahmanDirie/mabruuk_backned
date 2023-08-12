const mongoose = require("mongoose");

const CatgeorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
      },
    status:{
      type: String,
      enum:["active", "in active"],
      default:"active"
  },
  },
  { timestamps: true }
);

const category = mongoose.model("Category", CatgeorySchema);
module.exports = { Category: category};