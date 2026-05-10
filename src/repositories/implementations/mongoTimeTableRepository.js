import { timetableModel } from "../../models/timeTable.model.js";
import ITimeTableRepository from "../contracts/ITimeTableRepository.js";
import { AppError } from "../../utils/errors.js";

class mongoTimeTableRepository extends ITimeTableRepository {
    async create(data) {
        try {
            return await timetableModel.create(data);
        } catch (error) {
            console.error("Error creating timetable:", error);
            throw new AppError("Failed to create timetable", 500);
        }
    }

    async findBySemester(semesterId) {
        try {
            return await timetableModel
                .find({ semester: semesterId })
                .populate("course", "name code")
                .populate("class", "name section")
                .populate("teacher", "name email")
                .exec();
        } catch (error) {
            console.error("Error finding timetable by semester:", error);
            throw new AppError("Failed to fetch timetable", 500);
        }
    }

    async findBySemesterRaw(semesterId) {
        try {
            // Populate ke bina — lecture generation ke liye
            return await timetableModel.find({ semester: semesterId });
        } catch (error) {
            console.error("Error finding timetable raw:", error);
            throw new AppError("Failed to fetch timetable data", 500);
        }
    }

    async deleteById(id) {
        try {
            const timetable = await timetableModel.findByIdAndDelete(id);
            if (!timetable) {
                throw new AppError("Timetable entry not found", 404);
            }
            return timetable;
        } catch (error) {
            console.error("Error deleting timetable:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to delete timetable entry", 500);
        }
    }

    // Legacy method for backward compatibility
    async createTimeTable(timeTableData) {
        return await this.create(timeTableData);
    }
}

export default mongoTimeTableRepository;
