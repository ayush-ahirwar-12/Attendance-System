import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin","faculty","student","manager"],
    lowercase: true,
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
