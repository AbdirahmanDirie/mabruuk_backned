const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    phone: { type: Number, required: true },
    mobile: { type: Number, required: true },
    status:{ type: String, enum:["active", "in active"], default:"active" },
  },
  { timestamps: true }
);

const client = mongoose.model("Client", ClientSchema);
module.exports = { Client: client};
