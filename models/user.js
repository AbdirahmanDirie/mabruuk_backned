const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	phone: { type: Number, required: true},
	password: { type: String, required: true},
	type: { type: String, enum: ["user", "admin"], default: "user", required: true},
	email:{ type:String, required: [true, "Please add an email"], unique: true, trim:true, match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter  valid email"
        ]},
    image:{ type: Object, default: {}},
    status:{ type: String, enum: ["active", "inactive"], default: "active"}
},
{ timestamps: true }

);




const user = mongoose.model("User", UserSchema);
module.exports = { User: user};