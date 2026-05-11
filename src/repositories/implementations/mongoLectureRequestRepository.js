import { lectureRequestModel } from "../../models/lectureRequest.model.js";
import ILectureRequestRepository from "../contracts/ILectureRequestRepository.js";
import { AppError } from "../../utils/errors.js";

class MongoLectureRequestRepository extends ILectureRequestRepository {
  async create(teacherId,data) {
    try {
      return await lectureRequestModel.create(data);
    } catch (error) {
      console.error("Error creating lecture request:", error);
      throw new AppError("Failed to create lecture request", 500);
    }
  }

  async findPending() {
    try {
      return await lectureRequestModel
        .find({ status: "pending" })
        .populate("teacher", "name email")
        .populate("course", "name code")
        .populate("class", "name")
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error finding pending lecture requests:", error);
      throw new AppError("Failed to fetch pending requests", 500);
    }
  }

  async findByTeacher(teacherId) {
    try {
      return await lectureRequestModel
        .find({ teacher: teacherId })
        .populate("course", "name code")
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error finding lecture requests by teacher:", error);
      throw new AppError("Failed to fetch teacher's lecture requests", 500);
    }
  }

  async findById(id) {
    try {
      const request = await lectureRequestModel.findById(id);
      
      if (!request) {
        throw new AppError("Lecture request not found", 404);
      }
      
      return request;
    } catch (error) {
      console.error("Error finding lecture request:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch lecture request", 500);
    }
  }

  async updateStatus(id, status, reviewedBy) {
    try {
      const validStatuses = ["pending", "approved", "rejected"];
      
      if (!validStatuses.includes(status)) {
        throw new AppError("Invalid status. Must be pending, approved, or rejected", 400);
      }
      
      const request = await lectureRequestModel.findByIdAndUpdate(
        id,
        { status, reviewedBy, reviewedAt: new Date() },
        { new: true }
      ).populate("teacher", "name email")
       .populate("course", "name code")
       .populate("class", "name");
      
      if (!request) {
        throw new AppError("Lecture request not found", 404);
      }
      
      return request;
    } catch (error) {
      console.error("Error updating lecture request status:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update lecture request status", 500);
    }
  }
}

export default MongoLectureRequestRepository;
