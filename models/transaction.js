const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({ title: { type: String, required: true,},
  amount: { type: Number, required: true},
  type: { type: String, enum:["income", "expense"], default:"income", required: true},
  date: { type: Date, default: Date.now }, 
  description:{ type: String,},
  category:{ type: String,}
},
{ timestamps: true }
);

module.exports = mongoose.model('transaction', TransactionSchema);