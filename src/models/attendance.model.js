import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'attendanceSessions', required: true },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'lectures', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'absent'
    },
    markedBy: {
      type: String,
      enum: ['face', 'qr', 'manual']
    },
    markedAt: { type: Date, default: Date.now },

    // LOCATION DATA — add karo
    location: {
      latitude: Number,
      longitude: Number,
      distance: Number, // class se kitna door tha (meters me)
      isWithinRadius: Boolean // radius ke andar tha ya nahi
    },

    // FACE DATA — add karo
    faceMatch: {
      isMatched: Boolean,
      confidence: Number // 0 to 1 (kitna confident hai match)
    },

    // Override
    overriddenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    overrideReason: { type: String, default: null }
  },
  { timestamps: true }
)

attendanceRecordSchema.index(
  { session: 1, student: 1 },
  { unique: true }
);

export const attendanceRecordModel = mongoose.model(
  "attendanceRecords",
  attendanceRecordSchema
);
