import mongoose from "mongoose";

const qrSessionSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
   class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
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

