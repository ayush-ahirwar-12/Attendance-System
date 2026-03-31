import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin","user","student","teacher","manager"],
    lowercase: true,
    default:"user",
    trim: true,
  },
  description:{
    type:String,
    required:true,
    trim:true
  }
},{
  timestamps:true
});

export default mongoose.model("Role",RoleSchema);
