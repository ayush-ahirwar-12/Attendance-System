import mongoHolidayRepository from "../repositories/implementations/mongoHolidayRepository";
import { AppError } from "../utils/errors";

class holidayService{
    constructor() {
        this.holidayRepository = new mongoHolidayRepository()
    }

    async createHoliday(holidayData) {
        if(!holidayData.name || !holidayData.date) {
            throw new AppError("Name and date are required to create a holiday.",404);
        }
        return await this.holidayRepository.createHoliday(holidayData);
    }
}