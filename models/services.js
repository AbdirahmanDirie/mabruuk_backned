const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema(
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

const service = mongoose.model("Service", ServicesSchema);
module.exports = { Service: service};
