import { semesterModel } from "../../models/semester.model.js";
import ISemesterRepository from "../contracts/ISemesterRepository.js";
import { AppError } from "../../utils/errors.js";

class mongoSemesterRepository extends ISemesterRepository {

    async create(data) {
        try {
            return await semesterModel.create(data);
        } catch (error) {
            console.error("Error creating semester:", error);
            throw new AppError("Failed to create semester", 500);
        }
    }

    async findById(id) {
        try {
            const semester = await semesterModel.findById(id);
            if (!semester) {
                throw new AppError("Semester not found", 404);
            }
            return semester;
        } catch (error) {
            console.error("Error finding semester by ID:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to fetch semester", 500);
        }
    }

    async findAll() {
        try {
            return await semesterModel.find().sort({ createdAt: -1 });
        } catch (error) {
            console.error("Error finding all semesters:", error);
            throw new AppError("Failed to fetch semesters", 500);
        }
    }

    async updateStatus(id, status) {
        try {
            const validStatuses = ["upcoming", "active", "completed"];
            
            if (!validStatuses.includes(status)) {
                throw new AppError("Invalid status. Must be upcoming, active, or completed", 400);
            }
            
            const semester = await semesterModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            
            if (!semester) {
                throw new AppError("Semester not found", 404);
            }
            
            return semester;
        } catch (error) {
            console.error("Error updating semester status:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to update semester status", 500);
        }
    }

    // Legacy methods for backward compatibility
    async createSemester(semesterData) {
        return await this.create(semesterData);
    }
}

export default mongoSemesterRepository;