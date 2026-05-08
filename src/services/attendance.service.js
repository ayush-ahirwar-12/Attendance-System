import { attendanceModel } from "../models/attendance.model.js";
import { AppError } from "../utils/errors.js";

class AttendanceService {
  async getAttendanceBySession(qrSessionId) {
    const attendanceRecords = await attendanceModel.find({ qrSession: qrSessionId })
      .populate("student", "firstName lastName email rollNo faceDescriptor phoneNumber")
      .exec();
    return attendanceRecords;
  }

  async overrideStatus(attendanceId, status) {
    const validStatuses = ["present", "absent", "late"];
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status", 400);
    }
    
    const record = await attendanceModel.findByIdAndUpdate(
      attendanceId,
      { status },
      { new: true }
    ).populate("student", "firstName lastName email rollNo");
    
    if (!record) {
      throw new AppError("Attendance record not found", 404);
    }
    return record;
  }

  async markAllPresent(qrSessionId) {
    await attendanceModel.updateMany(
      { qrSession: qrSessionId, status: { $ne: "present" } },
      { $set: { status: "present", arrivalTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) } }
    );
    
    return await this.getAttendanceBySession(qrSessionId);
  }
}

export default AttendanceService;
