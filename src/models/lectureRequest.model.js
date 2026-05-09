import mongoose from "mongoose";

const lectureRequestSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true
  },
  type: {
    type: String,
    enum: ["extra", "cancel"],
    required: true
  },
  requestedDate: Date,
  requestedStartTime: String,
  requestedEndTime: String,
  lectureToCancel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lectures",
    default: null
  },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null
  },
  reviewedAt: { type: Date, default: null }
}, { timestamps: true });

export const lectureRequestModel = mongoose.model(
  "lectureRequests",
  lectureRequestSchema
);

