import IHolidayRepository from "../contracts/IHolidayRepository";

class mongoHolidayRepository extends IHolidayRepository {
    async createHoliday(holidayData) {
        return await this.holidayModel.create(holidayData);
    }
}

export default mongoHolidayRepository;