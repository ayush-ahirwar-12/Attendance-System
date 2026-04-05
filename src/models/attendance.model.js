import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },

  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },

  qrSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "qr",
  },

  // 🔥 Face verification result
  faceMatched: {
    type: Boolean,
    default: false,
  },

  faceDistance: {
    type: Number, // store distance for debugging
  },

  // 🔥 GPS verification
  location: {
    latitude: Number,
    longitude: Number,
  },

  isWithinRadius: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  }

}, { timestamps: true });

export const attendanceModel = mongoose.model("attendance", attendanceSchema.index(
  { student: 1, qrSession: 1 },
  { unique: true }
));