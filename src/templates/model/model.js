import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "admin" }  ,
    status: { type: String, default: "active" }
},{
    timestamps: true,
    versionKey: false
})


export default mongoose.model('User', userSchema)
