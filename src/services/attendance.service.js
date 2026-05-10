import { attendanceModel } from "../models/attendance.model.js";
import { AppError } from "../utils/errors.js";
import MongoAttendanceRecordRepository from "../repositories/implementations/mongoAttendanceRecordRepository.js";

class AttendanceService {
  constructor() {
    this.attendanceRecordRepository = new MongoAttendanceRecordRepository();
  }

  // Existing methods for backward compatibility
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

  // New AttendanceRecord methods
  async createRecord(data) {
    return await this.attendanceRecordRepository.create(data);
  }

  async bulkCreateRecords(records) {
    return await this.attendanceRecordRepository.bulkCreate(records);
  }

  async getRecordsBySession(sessionId) {
    return await this.attendanceRecordRepository.findBySession(sessionId);
  }

  async getRecord(sessionId, studentId) {
    return await this.attendanceRecordRepository.findOne(sessionId, studentId);
  }

  async upsertRecord(sessionId, studentId, data) {
    return await this.attendanceRecordRepository.upsertRecord(sessionId, studentId, data);
  }

  async updateRecord(recordId, data) {
    return await this.attendanceRecordRepository.overrideRecord(recordId, data);
  }

  async countPresentRecords(lectureIds, studentId) {
    return await this.attendanceRecordRepository.countPresent(lectureIds, studentId);
  }

  async getAttendedStudentIds(sessionId) {
    return await this.attendanceRecordRepository.getMarkedStudentIds(sessionId);
  }
}

export default AttendanceService;
