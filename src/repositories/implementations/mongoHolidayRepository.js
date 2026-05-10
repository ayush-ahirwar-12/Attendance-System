import { holidayModel } from "../../models/holiday.model.js";
import IHolidayRepository from "../contracts/IHolidayRepository.js";
import { AppError } from "../../utils/errors.js";

class mongoHolidayRepository extends IHolidayRepository {
    async create(data) {
        try {
            return await holidayModel.create(data);
        } catch (error) {
            console.error("Error creating holiday:", error);
            throw new AppError("Failed to create holiday", 500);
        }
    }

    async findBySemester(semesterId) {
        try {
            return await holidayModel
                .find({ semester: semesterId })
                .sort({ date: 1 });
        } catch (error) {
            console.error("Error finding holidays by semester:", error);
            throw new AppError("Failed to fetch holidays", 500);
        }
    }

    async getHolidayDateStrings(semesterId) {
        try {
            const holidays = await holidayModel.find({ semester: semesterId });
            return holidays.map(h => new Date(h.date).toDateString());
        } catch (error) {
            console.error("Error getting holiday date strings:", error);
            throw new AppError("Failed to fetch holiday dates", 500);
        }
    }

    async deleteById(id) {
        try {
            const holiday = await holidayModel.findByIdAndDelete(id);
            if (!holiday) {
                throw new AppError("Holiday not found", 404);
            }
            return holiday;
        } catch (error) {
            console.error("Error deleting holiday:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to delete holiday", 500);
        }
    }

    // Legacy method for backward compatibility
    async createHoliday(holidayData) {
        return await this.create(holidayData);
    }
}

export default mongoHolidayRepository;