import mongoHolidayRepository from "../repositories/implementations/mongoHolidayRepository.js";
import { AppError } from "../utils/errors.js";

class holidayService{
    constructor() {
        this.holidayRepository = new mongoHolidayRepository()
    }

    async createHoliday(holidayData) {
        if(!holidayData.name || !holidayData.date) {
            throw new AppError("Name and date are required to create a holiday.",404);
        }
        return await this.holidayRepository.create(holidayData);
    }

    async create(data) {
        if(!data.name || !data.date) {
            throw new AppError("Name and date are required to create a holiday.", 400);
        }
        return await this.holidayRepository.create(data);
    }

    async findBySemester(semesterId) {
        return await this.holidayRepository.findBySemester(semesterId);
    }

    async getHolidayDateStrings(semesterId) {
        return await this.holidayRepository.getHolidayDateStrings(semesterId);
    }

    async deleteById(id) {
        return await this.holidayRepository.deleteById(id);
    }
}

export default holidayService;