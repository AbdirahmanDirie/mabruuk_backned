const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EventSchema = new mongoose.Schema(
  {
    clientId:{ type: ObjectId, ref: "Client" },
    startDate:{ type: Date },
    endDate:{ type: Date },
    categoryId:{ type: ObjectId, ref: "Category" },
    serviceId:{ type: ObjectId, ref: "Service" },
    status:{ type: String, enum:{values: ["Booked", "Approved", "Canceled"], msg: 'Status is required.'}, trim: true,default:"Booked"},
    address:{ type: String },
    description:{ type: String },
    deleteStatus:{ type: String, enum:["active", "in active"], default:"active"},
  },
  { timestamps: true }
);

const event = mongoose.model("Event", EventSchema);
module.exports = { Event: event};
