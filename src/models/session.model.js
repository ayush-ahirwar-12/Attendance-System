import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lectures",
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  method: {
    type: String,
    enum: ["face", "qr", "manual"],
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  qrToken: { type: String, default: null },
  qrExpiresAt: { type: Date, default: null },
  startedAt: { type: Date, default: Date.now },
  closedAt: { type: Date, default: null }
}, { timestamps: true });

export const attendanceSessionModel = mongoose.model(
  "attendanceSessions",
  attendanceSessionSchema
);