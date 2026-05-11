import { attendanceRecordModel } from "../../models/attendance.model.js";
import IAttendanceRecordRepository from "../contracts/IAttendanceRecordRepository.js";
import { AppError } from "../../utils/errors.js";

class MongoAttendanceRecordRepository extends IAttendanceRecordRepository {
  async create(data) {
    try {
      return await attendanceRecordModel.create(data);
    } catch (error) {
      console.error("Error creating attendance record:", error);
      throw new AppError("Failed to create attendance record", 500);
    }
  }

  async bulkCreate(records) {
    try {
      return await attendanceRecordModel.insertMany(records);
    } catch (error) {
      console.error("Error bulk creating attendance records:", error);
      throw new AppError("Failed to create attendance records", 500);
    }
  }

  async findBySession(sessionId) {
    try {
      return await attendanceRecordModel
        .find({ session: sessionId })
        .populate("student", "name email")
        .exec();
    } catch (error) {
      console.error("Error finding attendance records by session:", error);
      throw new AppError("Failed to fetch attendance records", 500);
    }
  }

  async findOne(sessionId, studentId) {
    try {
      return await attendanceRecordModel.findOne({
        session: sessionId,
        student: studentId
      });
    } catch (error) {
      console.error("Error finding attendance record:", error);
      throw new AppError("Failed to fetch attendance record", 500);
    }
  }

  async upsertRecord(sessionId, studentId, data) {
    try {
      return await attendanceRecordModel.findOneAndUpdate(
        { session: sessionId, student: studentId },
        { ...data, markedAt: new Date() },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error("Error upserting attendance record:", error);
      throw new AppError("Failed to update attendance record", 500);
    }
  }

  async overrideRecord(recordId, data) {
    try {
      const record = await attendanceRecordModel.findByIdAndUpdate(
        recordId,
        data,
        { new: true }   
      );
      
      if (!record) {
        throw new AppError("Attendance record not found", 404);
      }
      
      return record;
    } catch (error) {
      console.error("Error overriding attendance record:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to override attendance record", 500);
    }
  }

  async countPresent(lectureIds, studentId) {
    try {
      return await attendanceRecordModel.countDocuments({
        lecture: { $in: lectureIds },
        student: studentId,
        status: { $in: ["present", "late"] }
      });
    } catch (error) {
      console.error("Error counting present records:", error);
      throw new AppError("Failed to count attendance", 500);
    }
  }

  async getMarkedStudentIds(sessionId) {
    try {
      const records = await attendanceRecordModel.find({
        session: sessionId
        
      });
      return records.map(r => r.student.toString());
    } catch (error) {
      console.error("Error getting marked student IDs:", error);
      throw new AppError("Failed to fetch marked students", 500);
    }
  }
}

export default MongoAttendanceRecordRepository;
