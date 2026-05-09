const attendanceRecordSchema = new mongoose.Schema({
  session: { type: ObjectId, ref: "attendanceSessions", required: true },
  lecture: { type: ObjectId, ref: "lectures", required: true },
  student: { type: ObjectId, ref: "users", required: true },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "absent"
  },
  markedBy: {
    type: String,
    enum: ["face", "qr", "manual"]
  },
  markedAt: { type: Date, default: Date.now },

  // LOCATION DATA — add karo
  location: {
    latitude: Number,
    longitude: Number,
    distance: Number,       // class se kitna door tha (meters me)
    isWithinRadius: Boolean // radius ke andar tha ya nahi
  },

  // FACE DATA — add karo
  faceMatch: {
    isMatched: Boolean,
    confidence: Number      // 0 to 1 (kitna confident hai match)
  },

  // Override
  overriddenBy: { type: ObjectId, ref: "users", default: null },
  overrideReason: { type: String, default: null }
}, { timestamps: true });