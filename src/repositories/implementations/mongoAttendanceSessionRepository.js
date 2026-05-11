import { attendanceSessionModel } from "../../models/session.model.js";
import IAttendanceSessionRepository from "../contracts/IAttendanceSessionRepository.js";
import { AppError } from "../../utils/errors.js";

class MongoAttendanceSessionRepository extends IAttendanceSessionRepository {
  async create(data) {
    try {
      return await attendanceSessionModel.create(data);
    } catch (error) {
      console.error("Error creating attendance session:", error);
      throw new AppError("Failed to create attendance session", 500);
    }
  }

  async findOpenByLecture(lectureId) {
    try {
      const session = await attendanceSessionModel.findOne({
        lecture: lectureId,
        status: "open"
      });
      
      if (!session) {
        throw new AppError("Open session not found for this lecture", 404);
      }
      
      return session;
    } catch (error) {
      console.error("Error finding open session by lecture:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch session", 500);
    }
  }

  async findByIdAndTeacher(sessionId, teacherId) {
    try {
      const session = await attendanceSessionModel.findOne({
        _id: sessionId,
        teacher: teacherId,
        status: "open"
      });
      
      if (!session) {
        throw new AppError("Open session not found", 404);
      }
      
      return session;
    } catch (error) {
      console.error("Error finding session by ID and teacher:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch session", 500);
    }
  }

  async findByQrToken(qrToken) {
    try {
      const session = await attendanceSessionModel
        .findOne({ qrToken, status: "open" })
        .populate({
          path: "lecture",
          populate: { path: "class" }
        });
      
      if (!session) {
        throw new AppError("Invalid or expired QR token", 404);
      }
      
      return session;
    } catch (error) {
      console.error("Error finding session by QR token:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch session", 500);
    }
  }

  async closeSession(sessionId) {
    try {
      const session = await attendanceSessionModel.findByIdAndUpdate(
        sessionId,
        { status: "closed", closedAt: new Date() },
        { new: true }
      );
      
      if (!session) {
        throw new AppError("Session not found", 404);
      }
      
      return session;
    } catch (error) {
      console.error("Error closing session:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to close session", 500);
    }
  }
}

export default MongoAttendanceSessionRepository;
