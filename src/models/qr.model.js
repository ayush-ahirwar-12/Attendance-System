import mongoose from "mongoose";

const qrSessionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  qrToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export const qrSessionModel = mongoose.model("qr",qrSessionSchema);

