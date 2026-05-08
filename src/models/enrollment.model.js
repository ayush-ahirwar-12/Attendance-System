import mongoose from "mongoose";

const studentEnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true
  },

  // Optional course enrollment ke liye
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    default: null    // null matlab compulsory courses
                     // value hai matlab optional course
  },

  enrolledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"     // manager
  },
  status: {
    type: String,
    enum: ["active", "dropped", "completed"],
    default: "active"
  }
}, { timestamps: true });

// Duplicate enrollment rokne ke liye
studentEnrollmentSchema.index(
  { student: 1, class: 1, course: 1 },
  { unique: true }
);

studentEnrollmentSchema.index({ student: 1, class: 1 }, { unique: true });

export const enrollmentModel = mongoose.model('enrollments', studentEnrollmentSchema);